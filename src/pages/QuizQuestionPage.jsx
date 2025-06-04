import { Link, useParams, useNavigate, Navigate } from "react-router";
import { FaQuestion, FaSpinner, FaInfoCircle, FaCheckCircle, FaRegCircle, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { IoReturnDownBack } from "react-icons/io5";
import { useEffect } from 'react';
import { 
  submitAnswerService, 
  submitQuizService, 
  checkSessionAttemptQuizService,
  getAnswerUserQuizService,
  generateQuizAttemptService 
} from "../services";
import {useQuizStore} from "../utils";

function QuizQuestionPage() {
  const { quiz_attempt_id } = useParams();
  const navigate = useNavigate();
  const quizQuestions = useQuizStore(state => state.quizQuestions);
  const isLoadingQuestions = useQuizStore(state => state.isLoadingQuestions);
  const currentQuestionIndex = useQuizStore(state => state.currentQuestionIndex);
  const setCurrentQuestionIndex = useQuizStore(state => state.setCurrentQuestionIndex);
  const userAnswers = useQuizStore(state => state.userAnswers);
  const isSubmittingAnswer = useQuizStore(state => state.isSubmittingAnswer);
  const setIsSubmittingAnswer = useQuizStore(state => state.setIsSubmittingAnswer);
  const loadingAnswerFor = useQuizStore(state => state.loadingAnswerFor);
  const setLoadingAnswerFor = useQuizStore(state => state.setLoadingAnswerFor);
  const setQuizResults = useQuizStore(state => state.setQuizResults);
  const isSubmittingQuiz = useQuizStore(state => state.isSubmittingQuiz);
  const setIsSubmittingQuiz = useQuizStore(state => state.setIsSubmittingQuiz);
  const setQuizQuestions = useQuizStore(state => state.setQuizQuestions);
  const updateUserAnswer = useQuizStore(state => state.updateUserAnswer);

  // Check for existing quiz session on component mount
  useEffect(() => {
    if (!quiz_attempt_id) {
      checkSessionAttemptQuizService(setQuizQuestions);
    }
  }, [setQuizQuestions, quiz_attempt_id]);

  // Generate quiz questions if needed
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      if (quiz_attempt_id && (!quizQuestions || !quizQuestions.questions)) {
        try {
          const data = await generateQuizAttemptService(quiz_attempt_id, setQuizQuestions);
          console.log("Generated quiz questions:", data);
        } catch (error) {
          console.error("Error generating quiz questions:", error);
        }
      }
    };
    
    fetchQuizQuestions();
  }, [quiz_attempt_id, quizQuestions, setQuizQuestions]);
  // Fetch user's saved answers for the current question
  useEffect(() => {
    const fetchUserAnswers = async () => {
      if (quiz_attempt_id && quizQuestions && quizQuestions.questions) {
        const currentQuestion = getCurrentQuestion();
        if (currentQuestion) {
          try {
            getAnswerUserQuizService(
              quiz_attempt_id, 
              currentQuestion.question_id,
              (answerData) => {
                if (answerData && answerData.user_answer) {
                  updateUserAnswer(
                    currentQuestion.question_id, 
                    currentQuestion.question_type === "multiple_answer" 
                      ? answerData.user_answer 
                      : answerData.user_answer[0]
                  );
                }
              }
            );
          } catch (error) {
            console.error("Error fetching user answers:", error);
          }
        }
      }
    };
    
    fetchUserAnswers();
  }, [quiz_attempt_id, currentQuestionIndex, quizQuestions, updateUserAnswer, getCurrentQuestion]);

  const handleSelectAnswer = (questionId, answer) => {
    if (isSubmittingAnswer) return;
    setLoadingAnswerFor(answer);
    try {
      useQuizStore.getState().updateUserAnswer(questionId, answer);
    } catch (error) {
      console.error("Error selecting answer:", error);
    } finally {
      setTimeout(() => {
        setLoadingAnswerFor(null);
      }, 300);
    }
  };


  const handleSelectMultipleAnswer = (questionId, answer) => {
    
    if (isSubmittingAnswer) return;
    
    try {
      const currentAnswers = userAnswers[questionId] || [];
      let newAnswers;
      
      if (currentAnswers.includes(answer)) {
        newAnswers = currentAnswers.filter(a => a !== answer);
      } else {
        newAnswers = [...currentAnswers, answer];
      }

      useQuizStore.getState().updateUserAnswer(questionId, newAnswers);
    } catch (error) {
      console.error("Error handling multiple answer selection:", error);
    }
  };
  
  // Check if answer is being loaded
  const isAnswerLoading = (answer) => {
    return isSubmittingAnswer && loadingAnswerFor === answer;
  };
    // Get current question
  const getCurrentQuestion = () => {
    if (!quizQuestions || !quizQuestions.questions || quizQuestions.questions.length === 0) {
      return null;
    }
    return quizQuestions.questions[currentQuestionIndex];
  };
  
  const submitCurrentQuestionAnswers = async () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion || !quiz_attempt_id) return;
    
    const questionId = currentQuestion.question_id;
    const userAnswer = userAnswers[questionId];
    
    if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
      return;
    }

    setIsSubmittingAnswer(true);
      
    try {
      if (currentQuestion.question_type === "multiple_choice") {
        setLoadingAnswerFor(userAnswer);
      } else {
        setLoadingAnswerFor("submitting");
      }
      
      await submitAnswerService(
        quiz_attempt_id,
        questionId,
        userAnswer,
        (isLoading) => {
          setIsSubmittingAnswer(isLoading);
          if (!isLoading) {
            setLoadingAnswerFor(null);
          }
        }
      );
    } catch (error) {
      console.error("Error submitting answer:", error);
      setIsSubmittingAnswer(false);
      setLoadingAnswerFor(null);
    }
  };
    // Move to next question
  const handleNextQuestion = async () => {
    if (!quizQuestions || currentQuestionIndex >= quizQuestions.questions.length - 1) return;
    await submitCurrentQuestionAnswers();
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
    // Move to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  // Submit the entire quiz
  const handleSubmitQuiz = async () => {
    try {
      // Submit final question answers first
      await submitCurrentQuestionAnswers();
      
      // Submit the entire quiz
      setIsSubmittingQuiz(true);
      
      if (quiz_attempt_id) {
        await submitQuizService(
          quiz_attempt_id,
          setIsSubmittingQuiz,
          setQuizResults
        );

        navigate('/quiz');
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setIsSubmittingQuiz(false);
    }
  };
  

  if (!quizQuestions) {
    return <Navigate to="/quiz" replace />;
  }

  // Show loading indicator
  if (isLoadingQuestions) {
    return (
      <div className="min-h-svh bg-[#FFEBC8] py-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <Link to="/home">
            <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
          </Link>
          
          <FaSpinner className="text-4xl text-[#D4A017] animate-spin mb-2" />
          <p className="text-gray-600">Memuat Soal Quiz...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-3xl bg-white/70 rounded-xl p-8 shadow-lg">      
    <h2 className="text-2xl font-bold text-center mb-8">Quiz Questions</h2>  
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#FFEBB3] py-3 px-6 border-b border-[#D4A017] flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#333]">
            Pertanyaan {currentQuestionIndex + 1} dari {quizQuestions.questions?.length || 0}
          </h3>
          <div className="flex items-center text-[#333] text-sm font-medium">
            <FaInfoCircle className="mr-2" />
            <span>Selesai: {quizQuestions.expired_at ? new Date(quizQuestions.expired_at).toLocaleString() : 'Tidak ada batas waktu'}</span>
          </div>
        </div>
        <div className="p-6">
          {getCurrentQuestion() && (
            <div>
              <div className="mb-6">
                <div className="flex items-start mb-5">
                  <FaQuestion className="text-[#D4A017] text-xl mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 font-medium text-lg">
                    {getCurrentQuestion().question_text}
                  </p>
                </div>
              </div>
              
              {getCurrentQuestion().question_type === "multiple_choice" && (
                <div className="pl-2 mt-6">
                  {loadingAnswerFor === "submitting" && (
                    <div className="flex items-center justify-end text-[#D4A017] text-xs mb-3">
                      <FaSpinner className="animate-spin mr-1" />
                      <span>Menyimpan jawaban...</span>
                    </div>
                  )}
                  {Object.entries(getCurrentQuestion().possible_answers).map(([key, value]) => (
                    <div 
                      key={key}
                      onClick={() => !isSubmittingAnswer && handleSelectAnswer(getCurrentQuestion().question_id, key)}
                      className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all
                        ${isSubmittingAnswer ? 'opacity-60' : 'hover:bg-[#FFEBB3]/20'}
                        ${userAnswers[getCurrentQuestion().question_id] === key ? 'bg-[#FFEBB3] border border-[#D4A017]' : 'bg-white border border-gray-200'}`
                      }
                    >
                      <div className="mr-3 text-lg">
                        {userAnswers[getCurrentQuestion().question_id] === key ? 
                          <FaCheckCircle className="text-[#D4A017]" /> : 
                          <FaRegCircle className="text-gray-400" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{value}</p>
                      </div>
                      {isAnswerLoading(key) && (
                        <div className="ml-2">
                          <FaSpinner className="animate-spin text-[#D4A017]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
               
              {getCurrentQuestion().question_type === "multiple_answer" && (
                <div className="pl-2 mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-gray-500 italic">
                      * Pilih satu atau lebih jawaban yang benar
                    </p>
                    {loadingAnswerFor === "submitting" && (
                      <div className="flex items-center text-[#D4A017] text-xs">
                        <FaSpinner className="animate-spin mr-1" />
                        <span>Menyimpan jawaban...</span>
                      </div>
                    )}
                  </div>
                  {Object.entries(getCurrentQuestion().possible_answers).map(([key, value]) => {
                    const isSelected = userAnswers[getCurrentQuestion().question_id]?.includes(key) || false;
                    return (
                      <div 
                        key={key}
                        onClick={() => !isSubmittingAnswer && handleSelectMultipleAnswer(getCurrentQuestion().question_id, key)}
                        className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all
                          ${isSubmittingAnswer ? 'opacity-60' : 'hover:bg-[#FFEBB3]/20'}
                          ${isSelected ? 'bg-[#FFEBB3] border border-[#D4A017]' : 'bg-white border border-gray-200'}`
                        }
                      >
                        <div className="mr-3 text-lg">
                          {isSelected ? 
                            <FaCheckSquare className="text-[#D4A017]" /> : 
                            <FaRegSquare className="text-gray-400" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{value}</p>
                        </div>
                        {isAnswerLoading(key) && (
                          <div className="ml-2">
                            <FaSpinner className="animate-spin text-[#D4A017]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0 || isSubmittingAnswer}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    currentQuestionIndex === 0 || isSubmittingAnswer
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Sebelumnya
                </button>
                
                {currentQuestionIndex < quizQuestions.questions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    disabled={isSubmittingAnswer}
                    className={`px-4 py-2 bg-[#D4A017] cursor-pointer text-white rounded-lg font-medium transition-all ${
                      isSubmittingAnswer 
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[#C09016]'
                    }`}
                  >
                    {isSubmittingAnswer ? (
                      <div className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" />
                        <span>Menyimpan...</span>
                      </div>
                    ) : (
                      'Berikutnya'
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={isSubmittingAnswer || isSubmittingQuiz}
                    className={`px-4 py-2 bg-green-600 cursor-pointer text-white rounded-lg font-medium transition-all ${
                      isSubmittingAnswer || isSubmittingQuiz ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                  >
                    {isSubmittingAnswer ? (
                      <div className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" />
                        <span>Menyimpan...</span>
                      </div>
                    ) : isSubmittingQuiz ? (
                      <div className="flex items-center">
                        <FaSpinner className="animate-spin mr-2" />
                        <span>Menyelesaikan...</span>
                      </div>
                    ) : (
                      'Selesai Quiz'
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizQuestionPage;
