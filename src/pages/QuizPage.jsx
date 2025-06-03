import { quizQuestions } from '../utils'
import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { FaBrain, FaGamepad, FaSpinner } from 'react-icons/fa';
import { IoReturnDownBack } from "react-icons/io5";


function QuizPage() {
    // Theme selection state
    const [themeSelected, setThemeSelected] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // Quiz state
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState({
        correct: 0,
        incorrect: 0
    });
    
    // Current quiz data
    const [currentQuiz, setCurrentQuiz] = useState(null);
    
    // Handle theme selection
    const handleThemeSelect = async (theme) => {
        setSelectedTheme(theme);
        setIsLoading(true);
        
        // Simulate API call to backend (1.5 second delay)
        setTimeout(() => {
            // Get the quiz for selected theme from dummy data
            setCurrentQuiz(quizQuestions[theme]);
            setThemeSelected(true);
            setIsLoading(false);
        }, 1500);
    };
    
    // Initialize user answers when quiz is loaded
    useEffect(() => {
        if (currentQuiz && userAnswers.length === 0) {
            setUserAnswers(new Array(currentQuiz.questions.length).fill(null));
        }
    }, [currentQuiz, userAnswers.length]);
    
    const handleChooseAnswer = (index) => {
        setSelectedAnswer(index);
        const newUserAnswers = [...userAnswers];
        newUserAnswers[selectedQuestionIndex] = index;
        setUserAnswers(newUserAnswers);
    }

    const handleJumpToQuestion = (index) => {
        setSelectedQuestionIndex(index);
        setSelectedAnswer(userAnswers[index]);
    }

    const handleSubmit = () => {
        if (selectedAnswer === null) {
            return;
        }

        const newUserAnswers = [...userAnswers];
        newUserAnswers[selectedQuestionIndex] = selectedAnswer;
        setUserAnswers(newUserAnswers);

        if (selectedQuestionIndex < currentQuiz.questions.length - 1) {
            setSelectedQuestionIndex(selectedQuestionIndex + 1);
            setSelectedAnswer(userAnswers[selectedQuestionIndex + 1]);
        } else {
            const finalScore = {
                correct: 0,
                incorrect: 0
            };
            
            newUserAnswers.forEach((answer, index) => {
                if (answer === currentQuiz.questions[index].correctAnswer) {
                    finalScore.correct += 1;
                } else if (answer !== null) {
                    finalScore.incorrect += 1;
                }
            });
            
            setScore(finalScore);
            setQuizCompleted(true);
        }
    } 

    // Render theme selection screen
    const renderThemeSelection = () => {
        return (
            <div className="w-full max-w-3xl mx-auto bg-white/70 rounded-xl p-8 shadow-lg">
                <Link to="/home">
                    <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
                </Link> 
                <h2 className="text-2xl font-bold text-center mb-8">Pilih Tema Quiz</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                        onClick={() => handleThemeSelect("mental-health")}
                        disabled={isLoading}
                        className="cursor-pointer flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:border-[#D4A017] hover:shadow-md transition-all disabled:opacity-50"
                    >
                        <FaBrain className="text-5xl text-[#D4A017] mb-4" />
                        <h3 className="text-xl font-medium mb-2">Mental Health</h3>
                        <p className="text-gray-600 text-center">Quiz tentang dasar-dasar kesehatan mental dan praktik terbaiknya</p>
                    </button>
                    
                    <button 
                        onClick={() => handleThemeSelect("judi-online")}
                        disabled={isLoading}
                        className="cursor-pointer flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:border-[#D4A017] hover:shadow-md transition-all disabled:opacity-50"
                    >
                        <FaGamepad className="text-5xl text-[#D4A017] mb-4" />
                        <h3 className="text-xl font-medium mb-2">Judi Online</h3>
                        <p className="text-gray-600 text-center">Quiz tentang risiko dan dampak judi online terhadap kesehatan mental</p>
                    </button>
                </div>
                
                {isLoading && (
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <FaSpinner className="text-4xl text-[#D4A017] animate-spin mb-2" />
                        <p className="text-gray-600">Memuat Quiz...</p>
                    </div>
                )}
            </div>
        );
    };

    const renderQuestionNav = () => {
        return (
            <div className="flex flex-wrap gap-2 mb-6">
                {currentQuiz.questions.map((_, index) => {
                    let statusClass = "bg-white";
                    
                    if (userAnswers[index] !== null) {
                        statusClass = "bg-[#D4A017] text-white";
                    }
                    
                    if (selectedQuestionIndex === index) {
                        statusClass += " ring-2 ring-offset-2 ring-[#D4A017]";
                    }
                    
                    return (
                        <button 
                            key={index}
                            onClick={() => handleJumpToQuestion(index)}
                            className={`w-10 h-10 font-medium rounded-md flex items-center justify-center ${statusClass} shadow-sm transition-all hover:bg-[#C09016] hover:text-white`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        );
    }

    const renderAnswerChoices = () => {
        return (
            <div className="space-y-3 mb-6">
                {currentQuiz.questions[selectedQuestionIndex].choices.map((choice, index) => {
                    let choiceClass = "border-2 border-gray-300 bg-white";
                    
                    if (selectedAnswer === index) {
                        choiceClass = "border-2 border-[#D4A017] bg-[#FFEBB3]";
                    }
                    
                    return (
                        <div 
                            key={index} 
                            onClick={() => handleChooseAnswer(index)}
                            className={`p-4 rounded-lg cursor-pointer ${choiceClass} hover:border-[#D4A017] transition-colors`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${selectedAnswer === index ? 'bg-[#D4A017] text-white' : 'border-2 border-gray-300'}`}>
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <div>{choice}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
    
    const renderQuizResult = () => {
        const totalAnswered = score.correct + score.incorrect;
        const percentage = Math.round((score.correct / currentQuiz.questions.length) * 100);
        
        return (
            <div className="w-full max-w-3xl mx-auto bg-white/70 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Hasil Quiz {selectedTheme === "mental-health" ? "Mental Health" : "Judi Online"}
                </h2>
                
                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                        <div className="bg-[#D4A017] h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>0%</span>
                        <span>Score: {percentage}%</span>
                        <span>100%</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-green-600">{score.correct}</div>
                        <div className="text-green-600">Benar</div>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg text-center">
                        <div className="text-3xl font-bold text-red-600">{score.incorrect}</div>
                        <div className="text-red-600">Salah</div>
                    </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-center mb-8">
                    <div className="text-3xl font-bold text-blue-600">{currentQuiz.questions.length - totalAnswered}</div>
                    <div className="text-blue-600">Tidak Dijawab</div>
                </div>
                
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            setThemeSelected(false);
                            setSelectedTheme("");
                            setCurrentQuiz(null);
                            setQuizCompleted(false);
                            setSelectedQuestionIndex(0);
                            setSelectedAnswer(null);
                            setUserAnswers([]);
                            setScore({correct: 0, incorrect: 0});
                        }}
                        className="flex-1 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Coba Quiz Lain
                    </button>
                    
                    <Link 
                        to="/home" 
                        className="flex-1 py-3 bg-[#D4A017] text-white font-medium rounded-lg hover:bg-[#C09016] transition-colors block text-center"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    if (!themeSelected || !currentQuiz) {
        return (
            <div className="min-h-svh bg-[#FFEBC8] py-10 px-4 flex items-center justify-center">
                {renderThemeSelection()}
            </div>
        );
    }
    
    if (quizCompleted) {
        return (
            <div className="min-h-svh bg-[#FFEBC8] py-10 px-4">
                {renderQuizResult()}
            </div>
        );
    }

    return (
        <div className="min-h-svh bg-[#FFEBC8] py-10 px-4">
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Quiz {selectedTheme === "mental-health" ? "Mental Health" : "Judi Online"}
                </h1>
                {renderQuestionNav()}
                <div className="bg-white/70 rounded-xl p-6 shadow-lg mb-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                            <span className="text-[#D4A017] font-bold">{selectedQuestionIndex + 1}.</span> {currentQuiz.questions[selectedQuestionIndex].question}
                        </h3>
                        {renderAnswerChoices()}
                    </div>
                    <div className="flex justify-between">
                        <button 
                            onClick={() => selectedQuestionIndex > 0 && handleJumpToQuestion(selectedQuestionIndex - 1)}
                            className={`px-4 py-2 rounded-lg border border-gray-300 ${selectedQuestionIndex > 0 ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
                            disabled={selectedQuestionIndex === 0}
                        >
                            Sebelumnya
                        </button>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleSubmit}
                                className={`px-4 py-2 bg-[#D4A017] text-white rounded-lg ${selectedAnswer !== null ? 'hover:bg-[#C09016]' : 'opacity-50 cursor-not-allowed'}`}
                                disabled={selectedAnswer === null}
                            >
                                {selectedQuestionIndex === currentQuiz.questions.length - 1 ? 'Submit' : 'Berikutnya'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-amber-700">
                    <p className="font-medium">Tips:</p>
                    <ul className="list-disc list-inside text-sm">
                        <li>Klik nomor soal untuk berpindah antar soal</li>
                        <li>Tombol nomor akan berwarna kuning jika sudah dijawab</li>
                        <li>Klik "Submit" untuk melihat hasil setelah menjawab semua soal</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default QuizPage;