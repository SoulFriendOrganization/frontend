/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router";
import { FaQuestion, FaSpinner, FaCheckCircle, FaRegCircle, FaCheckSquare, FaRegSquare, FaClock } from 'react-icons/fa';
import { useEffect, useCallback, useState } from 'react';
import { 
  submitAnswerService, 
  submitQuizService, 
  getAnswerUserQuizService,
  generateQuizAttemptService 
} from "../services";
import { useQuizStore } from "../utils";

const QuizTimer = ({ expiryTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, expired: false });
  
  useEffect(() => {
    if (!expiryTime) return;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(expiryTime);
      const difference = expiry - now;
      
      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, expired: true };
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { hours, minutes, seconds, expired: false };
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const timeRemaining = calculateTimeLeft();
      setTimeLeft(timeRemaining);
      
      if (timeRemaining.expired) {
        clearInterval(timer);
        if (onExpire && typeof onExpire === 'function') {
          onExpire();
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [expiryTime, onExpire]);
  
  if (!expiryTime) return <span>Tidak ada batas waktu</span>;
  
  if (timeLeft.expired) {
    return (
      <span className="text-red-600 font-bold animate-pulse">Waktu habis!</span>
    );
  }
  
  const isLowTime = timeLeft.hours === 0 && timeLeft.minutes < 5;
  const isCriticalTime = timeLeft.hours === 0 && timeLeft.minutes < 2;
  
  return (
    <span className={`font-medium ${
      isCriticalTime 
        ? 'text-red-600 animate-pulse font-bold' 
        : isLowTime 
          ? 'text-red-600' 
          : ''
    }`}>
      {timeLeft.hours.toString().padStart(2, '0')}:
      {timeLeft.minutes.toString().padStart(2, '0')}:
      {timeLeft.seconds.toString().padStart(2, '0')}
    </span>
  );
};

const TimerDisplay = ({ expiryTime, onExpire }) => {
  const [timeState, setTimeState] = useState({ 
    isLow: false, 
    isCritical: false, 
    isExpired: false 
  });
  
  useEffect(() => {
    if (!expiryTime) return;
    
    const checkTimeState = () => {
      const now = new Date();
      const expiry = new Date(expiryTime);
      const difference = expiry - now;
      
      if (difference <= 0) {
        if (onExpire && typeof onExpire === 'function' && !timeState.isExpired) {
          onExpire();
        }
        return { isLow: false, isCritical: false, isExpired: true };
      }
      
      const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
      
      return { 
        isLow: hoursLeft === 0 && minutesLeft < 5, 
        isCritical: hoursLeft === 0 && minutesLeft < 2,
        isExpired: false
      };
    };
    
    setTimeState(checkTimeState());
    
    const interval = setInterval(() => {
      setTimeState(checkTimeState());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [expiryTime, onExpire, timeState.isExpired]);
  
  const getBgColor = () => {
    if (timeState.isExpired) return 'bg-red-100';
    if (timeState.isCritical) return 'bg-red-100';
    if (timeState.isLow) return 'bg-amber-100';
    return 'bg-white/60';
  };
  
  const getIcon = () => {
    if (timeState.isExpired || timeState.isCritical) {
      return <FaClock className={`mr-2 ${timeState.isCritical ? 'text-red-600 animate-pulse' : 'text-red-600'}`} />;
    }
    return <FaClock className="mr-2 text-[#D4A017]" />;
  };
    return (
    <div className={`flex items-center text-sm font-medium ${getBgColor()} py-1 px-3 rounded-full ${timeState.isCritical ? 'border border-red-300' : ''}`}>
      {getIcon()}
      <span className="flex items-center">
        <span className="mr-1">Sisa Waktu:</span>
        <QuizTimer expiryTime={expiryTime} onExpire={onExpire} />
      </span>
    </div>
  );
};

function QuizQuestionPage() {
  const { quiz_attempt_id } = useParams();
  const navigate = useNavigate();
  const quizQuestions = useQuizStore(state => state.quizQuestions);
  const isLoadingQuestions = useQuizStore(state => state.isLoadingQuestions);
  const setIsLoadingQuestions = useQuizStore(state => state.setIsLoadingQuestions);
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

  const getCurrentQuestion = useCallback(() => {
    if (!quizQuestions || !quizQuestions.questions || quizQuestions.questions.length === 0) {
      return null;
    }
    return quizQuestions.questions[currentQuestionIndex];
  }, [quizQuestions, currentQuestionIndex]);

  const submitCurrentQuestionAnswers = useCallback(async () => {
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
      setIsSubmittingAnswer(false);
      setLoadingAnswerFor(null);
    }
  }, [getCurrentQuestion, quiz_attempt_id, userAnswers, setIsSubmittingAnswer, setLoadingAnswerFor]);

  const handleSubmitQuiz = useCallback(async () => {
    try {
      await submitCurrentQuestionAnswers();
      setIsSubmittingQuiz(true);
      
      if (quiz_attempt_id) {
        await submitQuizService(
          quiz_attempt_id,
          setIsSubmittingQuiz,
          setQuizResults,
          navigate
        );        
      }
    } catch (error) {
      setIsSubmittingQuiz(false);
    }
  }, [quiz_attempt_id, submitCurrentQuestionAnswers, setIsSubmittingQuiz, setQuizResults, navigate]);

  useEffect(() => {
    if (!quizQuestions?.expired_at) return;
    
    const expiry = new Date(quizQuestions.expired_at);
    const now = new Date();
    const timeUntilExpiry = expiry - now;
    
    if (timeUntilExpiry <= 0) {
      handleSubmitQuiz();
      return;
    }
    
    const timeoutId = setTimeout(() => {
      handleSubmitQuiz();
    }, timeUntilExpiry);
    
    return () => clearTimeout(timeoutId);
  }, [quizQuestions?.expired_at, handleSubmitQuiz]);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      if (!quiz_attempt_id) {
        navigate("/quiz", { replace: true });
        return;
      }

      if (quiz_attempt_id && (!quizQuestions || !quizQuestions.questions)) {
        try {
          setIsLoadingQuestions(true);
          await generateQuizAttemptService(quiz_attempt_id, setQuizQuestions);
        } catch (error) {
          navigate("/quiz", { replace: true });
        } finally {
          setIsLoadingQuestions(false);
        }
      }
    };
    
    fetchQuizQuestions();
  }, [quiz_attempt_id, quizQuestions, setQuizQuestions, navigate, setIsLoadingQuestions]);

  useEffect(() => {
    const fetchUserAnswers = async () => {
      const currentQuestion = getCurrentQuestion();
      
      if (quiz_attempt_id && currentQuestion) {
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
    };
    
    fetchUserAnswers();
  }, [quiz_attempt_id, currentQuestionIndex, quizQuestions, getCurrentQuestion, updateUserAnswer]);

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
  
  const isAnswerLoading = (answer) => {
    return isSubmittingAnswer && loadingAnswerFor === answer;
  };

  const handleNextQuestion = async () => {
    if (!quizQuestions || !quizQuestions.questions) return;
    
    await submitCurrentQuestionAnswers();
    
    if (currentQuestionIndex < quizQuestions.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (!quizQuestions || !quizQuestions.questions) return;
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (isLoadingQuestions) {
    return (
      <div className="min-h-svh bg-gradient-to-b from-[#FFEBC8]/80 to-amber-50 py-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">          
          <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-xl border border-amber-100 flex flex-col items-center">
            <div className="relative mb-6">
              <FaSpinner className="text-5xl text-[#D4A017] animate-spin" />
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl -z-10"></div>
            </div>
            <p className="text-amber-800 font-medium text-lg">Memuat Soal Quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();

  return (    
    <div className="min-h-svh bg-gradient-to-b from-[#FFEBC8]/70 to-amber-50 py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-100 relative backdrop-blur-sm bg-white/90">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#D4A017] mt-4">Quiz Questions</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
          <div className="bg-gradient-to-r from-[#FFEBB3] to-amber-100 py-4 px-6 border-b border-[#D4A017]/40 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">            <h3 className="text-xl font-bold text-amber-800">
              Pertanyaan {currentQuestionIndex + 1} dari {quizQuestions?.questions?.length || 0}
            </h3>
            <TimerDisplay expiryTime={quizQuestions?.expired_at} onExpire={handleSubmitQuiz} />
          </div>
          
          <div className="p-6 sm:p-8">
            {currentQuestion && (
              <div>
                <div className="mb-8">
                  <div className="flex items-start mb-5 bg-amber-50 p-4 rounded-lg border-l-4 border-[#D4A017]">
                    <FaQuestion className="text-[#D4A017] text-2xl mr-4 mt-1 flex-shrink-0" />
                    <p className="text-gray-800 font-medium text-lg">
                      {currentQuestion.question_text}
                    </p>
                  </div>
                </div>
                
                {currentQuestion.question_type === "multiple_choice" && (
                  <div className="mt-6 space-y-3">
                    {loadingAnswerFor === "submitting" && (
                      <div className="flex items-center justify-end text-[#D4A017] text-xs mb-2">
                        <FaSpinner className="animate-spin mr-2" />
                        <span>Menyimpan jawaban...</span>
                      </div>
                    )}
                    {Object.entries(currentQuestion.possible_answers).map(([key, value]) => {
                      const isSelected = userAnswers[currentQuestion.question_id] === key;
                      return (
                        <div 
                          key={key}
                          onClick={() => !isSubmittingAnswer && handleSelectAnswer(currentQuestion.question_id, key)}
                          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border-2
                            ${isSubmittingAnswer ? 'opacity-60' : 'hover:bg-amber-50 transform hover:scale-[1.01] hover:shadow-md'}
                            ${isSelected 
                              ? 'bg-[#FFEBB3] border-[#D4A017] shadow-md' 
                              : 'bg-white border-gray-100'}`
                          }
                        >
                          <div className="mr-4 text-xl">
                            {isSelected ? 
                              <FaCheckCircle className="text-[#D4A017]" /> : 
                              <FaRegCircle className="text-gray-400" />
                            }
                          </div>
                          <div className="flex-1">
                            <p className={`${isSelected ? 'text-amber-900 font-medium' : 'text-gray-700'}`}>{value}</p>
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
                
                {currentQuestion.question_type === "multiple_answer" && (
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-amber-700 italic bg-amber-50 py-1 px-3 rounded-full">
                        * Pilih satu atau lebih jawaban yang benar
                      </p>
                      {loadingAnswerFor === "submitting" && (
                        <div className="flex items-center text-[#D4A017] text-xs">
                          <FaSpinner className="animate-spin mr-1" />
                          <span>Menyimpan jawaban...</span>
                        </div>
                      )}
                    </div>
                    {Object.entries(currentQuestion.possible_answers).map(([key, value]) => {
                      const isSelected = userAnswers[currentQuestion.question_id]?.includes(key) || false;
                      return (
                        <div 
                          key={key}
                          onClick={() => !isSubmittingAnswer && handleSelectMultipleAnswer(currentQuestion.question_id, key)}
                          className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border-2
                            ${isSubmittingAnswer ? 'opacity-60' : 'hover:bg-amber-50 transform hover:scale-[1.01] hover:shadow-md'}
                            ${isSelected 
                              ? 'bg-[#FFEBB3] border-[#D4A017] shadow-md' 
                              : 'bg-white border-gray-100'}`
                          }
                        >
                          <div className="mr-4 text-xl">
                            {isSelected ? 
                              <FaCheckSquare className="text-[#D4A017]" /> : 
                              <FaRegSquare className="text-gray-400" />
                            }
                          </div>
                          <div className="flex-1">
                            <p className={`${isSelected ? 'text-amber-900 font-medium' : 'text-gray-700'}`}>{value}</p>
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
                
                <div className="flex justify-between mt-10">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0 || isSubmittingAnswer}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all cursor-pointer
                      ${currentQuestionIndex === 0 || isSubmittingAnswer
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-amber-800 border-2 border-amber-300 shadow hover:bg-amber-50 hover:shadow-md'
                      }`}
                  >
                    Sebelumnya
                  </button>
                  
                  {currentQuestionIndex < quizQuestions?.questions?.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      disabled={isSubmittingAnswer}
                      className={`px-5 py-2.5 rounded-lg font-medium transition-all cursor-pointer
                        ${isSubmittingAnswer 
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-[#C09016] hover:shadow-lg transform hover:scale-[1.02]'
                        } bg-gradient-to-r from-[#D4A017] to-amber-500 text-white shadow`}
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
                      className={`px-5 py-2.5 rounded-lg font-medium transition-all cursor-pointer
                        ${isSubmittingAnswer || isSubmittingQuiz 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-green-500 hover:shadow-lg transform hover:scale-[1.02]'
                        } bg-gradient-to-r from-green-600 to-green-500 text-white shadow`}
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
                
                <div className="mt-6 flex justify-center">
                  <div className="flex gap-1.5">
                    {quizQuestions.questions?.map((question, index) => (
                      <div 
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full ${
                          index === currentQuestionIndex
                            ? 'bg-[#D4A017]' 
                            : 'bg-amber-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizQuestionPage;