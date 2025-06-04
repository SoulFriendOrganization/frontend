import { FaTrophy, FaCheck, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Link } from "react-router";

function RenderQuizResults({ 
  quizResults,
}) {
  return (
    <div className="w-full max-w-3xl bg-white/70 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">Hasil Quiz</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#FFEBB3] py-3 px-6 border-b border-[#D4A017]">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#333]">Hasil Quiz</h3>
            <div className="flex items-center">
              <FaTrophy className="text-[#D4A017] text-xl mr-2" />
              <span className="text-lg font-bold">{quizResults.score}%</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3">Ringkasan Skor</h4>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-lg border border-amber-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Quiz ID:</p>
                  <p className="font-medium text-gray-800 truncate" title={quizResults.quiz_attempt_id}>
                    {quizResults.quiz_attempt_id?.substring(0, 8)}...
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Skor Anda:</p>
                  <div className="flex items-center">
                    <div className={`text-2xl font-bold ${
                      quizResults.score >= 80 ? 'text-green-600' :
                      quizResults.score >= 60 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {quizResults.score}%
                    </div>
                    <div className="ml-2">
                      {quizResults.score >= 80 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Sangat Baik
                        </span>
                      )}
                      {quizResults.score >= 60 && quizResults.score < 80 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                          Cukup
                        </span>
                      )}
                      {quizResults.score < 60 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                          Perlu Belajar Lagi
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Poin yang Diperoleh:</p>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-[#D4A017]">
                      {quizResults.points_earned || 0}
                    </div>
                    <div className="ml-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-[#FFEBB3] text-[#D4A017]">
                        Points
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {quizResults.evaluation_details && quizResults.evaluation_details.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold">Hasil Jawaban</h4>
                <div className="text-sm text-gray-500">
                  {quizResults.evaluation_details.filter(d => d.is_correct).length} dari {quizResults.evaluation_details.length} benar
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-[#D4A017] h-2.5 rounded-full" 
                  style={{ width: `${(quizResults.evaluation_details.filter(d => d.is_correct).length / quizResults.evaluation_details.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {quizResults.evaluation_details && quizResults.evaluation_details.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Rincian Jawaban</h4>
              
              {quizResults.evaluation_details.map((detail, index) => (
                <div 
                  key={detail.question_id || index} 
                  className={`mb-4 border-l-4 ${
                    detail.is_correct ? 'border-l-green-500' : 'border-l-red-500'
                  } bg-gray-50 p-4 rounded-r-lg shadow-sm`}
                >
                  <div className="flex items-start mb-3">
                    <div className={`flex-shrink-0 mt-1 mr-3 p-1.5 rounded-full ${
                      detail.is_correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {detail.is_correct ? <FaCheck /> : <FaTimes />}
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium mb-1">
                        {index + 1}. {detail.question_text}
                      </p>
                      <div className={`inline-block px-2 py-1 text-xs rounded-md ${
                        detail.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {detail.is_correct ? 'Jawaban Benar' : 'Jawaban Salah'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-8 space-y-3">
                    <div className="bg-white p-3 rounded-md border border-gray-100">
                      <p className="text-sm font-medium text-gray-600 mb-2">Jawaban Anda:</p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(detail.user_answer) && detail.user_answer
                          .filter(ans => ans !== null)
                          .map((ans, i) => (
                            <span 
                              key={i} 
                              className={`rounded-md px-3 py-1 text-sm border ${
                                detail.is_correct 
                                  ? 'border-green-200 bg-green-50 text-green-700' 
                                  : 'border-red-200 bg-red-50 text-red-700'
                              }`}
                            >
                              {ans}
                            </span>
                        ))}
                      </div>
                    </div>
                    
                    {!detail.is_correct && (
                      <div className="bg-white p-3 rounded-md border border-green-100">
                        <p className="text-sm font-medium text-gray-600 mb-2">Jawaban Benar:</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(detail.correct_answer) && detail.correct_answer
                            .filter(ans => ans !== null)
                            .map((ans, i) => (
                              <span 
                                key={i} 
                                className="border border-green-200 bg-green-50 text-green-700 rounded-md px-3 py-1 text-sm"
                              >
                                {ans}
                              </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {detail.possible_answers && Object.keys(detail.possible_answers).length > 0 && (
                      <div className="mt-3 text-xs text-gray-500">
                        <p className="font-medium mb-1">Semua Pilihan Jawaban:</p>
                        <ul className="list-disc list-inside pl-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                          {Object.entries(detail.possible_answers).map(([key, value]) => (
                            <li key={key} className="truncate">
                              <span className="font-medium">{key}:</span> {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link to="/home">
              <button className="w-full cursor-pointer sm:w-auto px-6 py-2 bg-[#D4A017] text-white rounded-lg font-medium transition-all hover:bg-[#C09016]">
                Kembali ke Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderQuizResults;
