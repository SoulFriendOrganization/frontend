import { useState } from 'react';
import { Link, useNavigate } from "react-router";
import { FaSpinner } from 'react-icons/fa';
import { IoReturnDownBack } from "react-icons/io5";
import { chooseQuizService, getQuizService } from "../services";
import useQuizStore from "../utils/quizStore";
import { 
  RenderQuizSelection, 
  RenderQuizPreview, 
  RenderQuizResults 
} from "../components";

function QuizPage() {    
    const navigate = useNavigate();
    const quizData = useQuizStore(state => state.quizData);
    const setQuizData = useQuizStore(state => state.setQuizData);
    const quizId = useQuizStore(state => state.quizId);
    const setQuizId = useQuizStore(state => state.setQuizId);
    const quizQuestions = useQuizStore(state => state.quizQuestions);
    const setQuizQuestions = useQuizStore(state => state.setQuizQuestions);
    const isLoading = useQuizStore(state => state.isLoading);
    const setIsLoading = useQuizStore(state => state.setIsLoading);
    const isLoadingQuestions = useQuizStore(state => state.isLoadingQuestions);
    const setIsLoadingQuestions = useQuizStore(state => state.setIsLoadingQuestions);
    const quizResults = useQuizStore(state => state.quizResults);
    
    const [tempTheme, setTempTheme] = useState("mental_health");
    const [tempDifficulty, setTempDifficulty] = useState("medium");

    const currentScreen = !quizData 
        ? "quizSelection"
        : quizQuestions && !quizResults
        ? "quizQuestions"
        : quizResults
        ? "quizResults"
        : "quizPreview";    


    const handleStartQuiz = () => {
        chooseQuizService(tempTheme, tempDifficulty, setIsLoading, setQuizId, setQuizData);
    };    
    
    
    const handleContinueQuiz = async () => {
        if (!quizId) {
            alert("Quiz ID tidak ditemukan. Silakan generate quiz kembali.");
            return;
        }
        getQuizService(quizId, setIsLoadingQuestions, setQuizQuestions, navigate);
    };
    
    return (
        <div className="min-h-svh bg-[#FFEBC8] py-10 px-4 flex items-center justify-center">
            <div className="w-full max-w-3xl mx-auto">
                <Link to="/home">
                    <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
                </Link>
                
                {currentScreen === "quizSelection" && (
                    <RenderQuizSelection 
                        tempTheme={tempTheme}
                        setTempTheme={setTempTheme}
                        tempDifficulty={tempDifficulty}
                        setTempDifficulty={setTempDifficulty}
                        handleStartQuiz={handleStartQuiz}
                        isLoading={isLoading}
                    />
                )}
                
                {currentScreen === "quizPreview" && (
                    <RenderQuizPreview
                        quizData={quizData}
                        handleContinueQuiz={handleContinueQuiz}
                        isLoadingQuestions={isLoadingQuestions}
                    />
                )}                

                {currentScreen === "quizResults" && (
                    <RenderQuizResults
                        quizResults={quizResults}
                    />
                )}
                
                {(isLoading || isLoadingQuestions) && (
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <FaSpinner className="text-4xl text-[#D4A017] animate-spin mb-2" />
                        <p className="text-gray-600">
                            {isLoading ? 'Memuat Quiz...' : 'Memuat Soal Quiz...'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizPage;