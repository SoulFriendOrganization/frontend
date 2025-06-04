import { FaBrain, FaGamepad } from 'react-icons/fa';

function RenderQuizSelection({ 
  tempTheme, 
  setTempTheme, 
  tempDifficulty, 
  setTempDifficulty, 
  handleStartQuiz,
  isLoading 
}) {
  return (
    <div className="w-full max-w-3xl bg-white/70 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">Pilih Quiz</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Pilih Tema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => !isLoading && setTempTheme("mental_health")}
            className={`cursor-pointer flex flex-col items-center justify-center p-6 bg-white border-2 rounded-xl shadow-sm transition-all ${isLoading ? 'opacity-50' : ''} ${tempTheme === "mental_health" ? 'border-[#D4A017] bg-[#FFEBB3]' : 'border-gray-200 hover:border-[#D4A017] hover:shadow-md'}`}
          >
            <FaBrain className="text-5xl text-[#D4A017] mb-4" />
            <h3 className="text-xl font-medium mb-2">Mental Health</h3>
            <p className="text-gray-600 text-center">Quiz tentang dasar-dasar kesehatan mental dan praktik terbaiknya</p>
          </div>
          
          <div 
            onClick={() => !isLoading && setTempTheme("judi_online")}
            className={`cursor-pointer flex flex-col items-center justify-center p-6 bg-white border-2 rounded-xl shadow-sm transition-all ${isLoading ? 'opacity-50' : ''} ${tempTheme === "judi_online" ? 'border-[#D4A017] bg-[#FFEBB3]' : 'border-gray-200 hover:border-[#D4A017] hover:shadow-md'}`}
          >
            <FaGamepad className="text-5xl text-[#D4A017] mb-4" />
            <h3 className="text-xl font-medium mb-2">Judi Online</h3>
            <p className="text-gray-600 text-center">Quiz tentang risiko dan dampak judi online terhadap kesehatan mental</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Pilih Tingkat Kesulitan</h3>
        <div className="grid grid-cols-3 gap-4">
          <div 
            onClick={() => !isLoading && setTempDifficulty("easy")}
            className={`cursor-pointer p-4 text-center rounded-lg border-2 transition-all ${isLoading ? 'opacity-50' : ''} ${tempDifficulty === "easy" ? 'border-[#D4A017] bg-[#FFEBB3]' : 'border-gray-200 hover:border-[#D4A017]'}`}
          >
            <h4 className="font-medium">Mudah</h4>
          </div>
          <div 
            onClick={() => !isLoading && setTempDifficulty("medium")}
            className={`cursor-pointer p-4 text-center rounded-lg border-2 transition-all ${isLoading ? 'opacity-50' : ''} ${tempDifficulty === "medium" ? 'border-[#D4A017] bg-[#FFEBB3]' : 'border-gray-200 hover:border-[#D4A017]'}`}
          >
            <h4 className="font-medium">Sedang</h4>
          </div>
          
          <div 
            onClick={() => !isLoading && setTempDifficulty("hard")}
            className={`cursor-pointer p-4 text-center rounded-lg border-2 transition-all ${isLoading ? 'opacity-50' : ''} ${tempDifficulty === "hard" ? 'border-[#D4A017] bg-[#FFEBB3]' : 'border-gray-200 hover:border-[#D4A017]'}`}
          >
            <h4 className="font-medium">Sulit</h4>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={handleStartQuiz}
          disabled={isLoading}
          className={`px-8 py-3 cursor-pointer bg-[#D4A017] text-white rounded-lg font-medium transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C09016]'}`}
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
}

export default RenderQuizSelection;
