import { FaInfoCircle } from 'react-icons/fa';

function RenderQuizPreview({ 
  quizData, 
  handleContinueQuiz, 
  isLoadingQuestions 
}) {
  return (
    <div className="w-full max-w-3xl bg-white/70 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">Quiz Preview</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#FFEBB3] py-3 px-6 border-b border-[#D4A017]">
          <h3 className="text-xl font-bold text-[#333]">{quizData.title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-8">{quizData.description}</p>
          
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center text-[#D4A017]">
              <FaInfoCircle className="h-6 w-6 mr-2" />
              <span className="text-sm text-gray-700">Quiz Preview</span>
            </div>
            <button
              onClick={handleContinueQuiz}
              disabled={isLoadingQuestions}
              className={`px-6 py-2 cursor-pointer bg-[#D4A017] text-white rounded-lg font-medium transition-all ${isLoadingQuestions ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C09016]'}`}
            >
              {isLoadingQuestions ? 'Memuat...' : 'Lanjutkan Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderQuizPreview;
