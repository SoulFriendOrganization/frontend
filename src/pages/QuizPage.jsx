import { quizQuestion } from '../utils'
import { useState, useEffect } from 'react';
import { Link } from "react-router";

function QuizPage() {
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState({
        correct: 0,
        incorrect: 0
    });    
    const { questions } = quizQuestion;
    const { question, choices } = questions[selectedQuestionIndex];

    useEffect(() => {
        if (userAnswers.length === 0) {
            setUserAnswers(new Array(questions.length).fill(null));
        }
    }, [questions.length, userAnswers.length]);

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

        if (selectedQuestionIndex < questions.length - 1) {
            setSelectedQuestionIndex(selectedQuestionIndex + 1);
            setSelectedAnswer(userAnswers[selectedQuestionIndex + 1]);
        } else {
            const finalScore = {
                correct: 0,
                incorrect: 0
            };
            
            newUserAnswers.forEach((answer, index) => {
                if (answer === questions[index].correctAnswer) {
                    finalScore.correct += 1;
                } else if (answer !== null) {
                    finalScore.incorrect += 1;
                }
            });
            
            setScore(finalScore);
            setQuizCompleted(true);
        }
    } 

    const renderQuestionNav = () => {
        return (
            <div className="flex flex-wrap gap-2 mb-6">
                {questions.map((_, index) => {
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
                {choices.map((choice, index) => {
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
        const percentage = Math.round((score.correct / questions.length) * 100);
        
        return (
            <div className="w-full max-w-3xl mx-auto bg-white/70 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Hasil Quiz</h2>
                
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
                    <div className="text-3xl font-bold text-blue-600">{questions.length - totalAnswered}</div>
                    <div className="text-blue-600">Tidak Dijawab</div>
                </div>                
                <Link 
                    to="/home" 
                    className="w-full py-3 bg-[#D4A017] text-white font-medium rounded-lg hover:bg-[#C09016] transition-colors block text-center"
                >
                    Kembali ke Beranda
                </Link>
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
                <h1 className="text-2xl font-bold mb-6 text-center">Quiz MentalHealth dan Judi Online</h1>
                {renderQuestionNav()}
                <div className="bg-white/70 rounded-xl p-6 shadow-lg mb-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">
                            <span className="text-[#D4A017] font-bold">{selectedQuestionIndex + 1}.</span> {question}
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
                                {selectedQuestionIndex === questions.length - 1 ? 'Submit' : 'Berikutnya'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 text-amber-700">
                    <p className="font-medium">Tips:</p>
                    <ul className="list-disc list-inside text-sm">
                        <li>Klik nomor soal untuk berpindah antar soal</li>
                        <li>Tombol nomor akan berwarna kuning jika sudah dijawab</li>
                        <li>Klik "Selesai" untuk melihat hasil tanpa harus menjawab semua soal</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default QuizPage;