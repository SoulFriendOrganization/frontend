import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { TbMoodWink, TbBrain, TbBook, TbSearch, TbMoodSmile, TbAward, TbChartBar, TbCalendarStats, TbMessage } from "react-icons/tb";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getHomeService } from "../services";
import { hasAgreedToMoodCheck, setMoodCheckAgreement, shouldShowMoodAlert, setDontShowMoodAlert } from "../utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HomePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    full_name: "",
    age: 0,
    today_mood: "",
    monthly_mood: {
      Happy: 0,
      Surprise: 0,
      Sad: 0,
      Anger: 0,
      Disgust: 0,
      Fear: 0,
      Neutral: 0
    },
    score: 0,
    point_earned: 0
  });  const [loading, setLoading] = useState(true);
  const [showMoodCheckTerms, setShowMoodCheckTerms] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    getHomeService(setUserData, setLoading);
  }, []);
  
  const handleMoodCheckClick = (e) => {
    e.preventDefault();
    
    if (hasAgreedToMoodCheck() || !shouldShowMoodAlert()) {
      navigate("/mood-check");
    } else {
      setShowMoodCheckTerms(true);
    }
  };

  const handleMoodCheckAgree = () => {
    setMoodCheckAgreement(true);
    if (dontShowAgain) {
      setDontShowMoodAlert();
    }
    setShowMoodCheckTerms(false);
    navigate("/mood-check");
  };

  const handleMoodCheckDisagree = () => {
    if (dontShowAgain) {
      setDontShowMoodAlert();
    }
    setShowMoodCheckTerms(false);
  };

  let chartData
  let chartOptions

  if(!userData.redirect_url) {
    chartData = {
        labels: Object.keys(userData.monthly_mood || {
            Happy: 0,
            Surprise: 0,
            Sad: 0,
            Anger: 0,
            Disgust: 0,
            Fear: 0,
            Neutral: 0
        }),
        datasets: [
          {
            label: 'Frekuensi Mood',
            data: Object.values(userData.monthly_mood || {}) || [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)', 
              'rgba(255, 159, 64, 0.6)',
              'rgba(153, 102, 255, 0.6)', 
              'rgba(255, 205, 86, 0.6)', 
              'rgba(201, 203, 207, 0.6)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(75, 192, 192)',
              'rgb(255, 159, 64)',
              'rgb(153, 102, 255)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }
        ]
      };
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      };

  }

  if(loading) {
    return (
      <div className="w-full min-h-svh flex flex-col items-center justify-center bg-[#FFEBC8]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFE2A8] mb-6"></div>
          <h1 className="text-center text-xl sm:text-2xl font-bold text-[#D4A017]">Memuat data...</h1>
          <p className="text-center text-gray-600 mt-2">Mohon tunggu sebentar</p>
        </div>      </div>
    )
  }

    if(userData.redirect_url) {        
        window.location.href = userData.redirect_url;
    }

  return (
    <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center">
        <div className="w-full flex items-center justify-center px-4 py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Hai {userData.full_name}, berikut Statistik Perkembangan Anda</h2>                
                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 justify-center">
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 flex flex-col items-center w-full lg:max-w-xs">
                        <div className="bg-[#FFE2A8] w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                            <TbMoodSmile className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-1 text-center">Mood Hari Ini</h3>
                        <p className="text-xl sm:text-2xl font-bold text-[#D4A017] capitalize">{userData.today_mood || "Belum terdata"}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 flex flex-col items-center w-full lg:max-w-xs">
                        <div className="bg-[#FFE2A8] w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                            <TbAward className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-1 text-center">Poin Terkumpul</h3>
                        <p className="text-xl sm:text-2xl font-bold text-[#D4A017]">{userData.point_earned || 0}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 flex flex-col items-center w-full lg:max-w-xs sm:col-span-2 lg:col-span-1">
                        <div className="bg-[#FFE2A8] w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                            <TbChartBar className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-1 text-center">Skor Quiz</h3>
                        <p className="text-xl sm:text-2xl font-bold text-[#D4A017]">{userData.score || 0}</p>
                    </div>
                </div>                
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 w-full">
                    <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                        <div className="bg-[#FFE2A8] w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-5">
                            <TbCalendarStats className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 text-xl sm:text-2xl text-center sm:text-left">Mood Bulanan</h3>
                    </div>
                    <div className="min-h-[200px] sm:min-h-[250px] flex items-center justify-center">
                        {loading ? (
                            <p className="text-sm text-gray-500">Memuat data...</p>
                        ) : Object.values(userData.monthly_mood || {
                            Happy: 0,
                            Surprise: 0,
                            Sad: 0,
                            Anger: 0,
                            Disgust: 0,
                            Fear: 0,
                            Neutral: 0
                        }).some(value => value > 0) ? (
                            <Bar 
                                data={chartData} 
                                options={chartOptions}
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <p className="text-sm text-gray-500">Grafik akan tersedia saat data terkumpul</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="px-4 flex flex-col items-center justify-center w-full max-w-7xl mx-auto py-8 sm:py-12 md:py-16">
            {userData.today_mood ? (
                <div className="mb-8 sm:mb-12 flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-8 md:px-12 rounded-lg bg-white/50 shadow-sm w-full">
                    <h1 className="font-bold text-2xl sm:text-3xl mb-2 sm:mb-3 text-center">Ingin Konsultasikan Masalah Mental Anda?</h1>
                    <p className="text-center text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Chatbot AI kami siap membantu menjawab pertanyaan seputar kesehatan mental</p>
                    <div className="w-full max-w-xs rounded-md overflow-hidden text-white">
                        <Link to="/chatbot" className="bg-[#D4A017] w-full h-12 sm:h-14 items-center justify-center flex gap-2 font-medium hover:bg-[#C09016] transition-colors text-sm sm:text-base">
                            Mulai Chat <TbMessage className="w-5 sm:w-6 h-5 sm:h-6"/>
                        </Link>
                    </div>
                </div>
            ) : (                <div className="mb-8 sm:mb-12 flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-8 md:px-12 rounded-lg bg-white/50 shadow-sm w-full">
                    <h1 className="font-bold text-2xl sm:text-3xl mb-2 sm:mb-3 text-center">Bagaimana Perasaanmu Hari Ini?</h1>
                    <p className="text-center text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Lakukan pengecekan mood harian untuk memahami kondisi mental Anda</p>
                    <div className="w-full max-w-xs rounded-md overflow-hidden text-white">
                        <button 
                            onClick={handleMoodCheckClick}
                            className="bg-[#D4A017] w-full h-12 sm:h-14 items-center justify-center flex gap-2 font-medium hover:bg-[#C09016] transition-colors text-sm sm:text-base cursor-pointer"
                        >
                            Cek Mood Sekarang <TbMoodWink className="w-5 sm:w-6 h-5 sm:h-6"/>
                        </button>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-16 w-full">
                <div className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-lg bg-white/50 shadow-sm h-full">
                    <div>
                        <TbBrain className="w-10 sm:w-12 h-10 sm:h-12 text-[#D4A017] mb-3 sm:mb-4 mx-auto" />
                        <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-center">Quiz Mental Health</h3>
                        <p className="text-center text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Uji pengetahuan Anda tentang kesehatan mental melalui quiz interaktif</p>
                    </div>
                    <div className="w-full rounded-md overflow-hidden text-white">
                        <Link to="/quiz" className="bg-[#D4A017] w-full h-10 sm:h-12 items-center justify-center flex gap-2 hover:bg-[#C09016] transition-colors text-sm sm:text-base">
                            Mulai Quiz <FaArrowRight className="w-3 sm:w-4 h-3 sm:h-4"/>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-lg bg-white/50 shadow-sm h-full">
                    <div>
                        <TbBook className="w-10 sm:w-12 h-10 sm:h-12 text-[#D4A017] mb-3 sm:mb-4 mx-auto" />
                        <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-center">Edukasi Mental Health</h3>
                        <p className="text-center text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Pelajari tentang kesehatan mental dan cara mengidentifikasi informasi hoax</p>
                    </div>
                    <div className="w-full rounded-md overflow-hidden text-white">
                        <Link to="/education" className="bg-[#D4A017] w-full h-10 sm:h-12 items-center justify-center flex gap-2 hover:bg-[#C09016] transition-colors text-sm sm:text-base">
                            Belajar Sekarang <FaArrowRight className="w-3 sm:w-4 h-3 sm:h-4"/>
                        </Link>
                    </div>
                </div>
                
                <div className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-lg bg-white/50 shadow-sm h-full sm:col-span-2 lg:col-span-1">
                    <div>
                        <TbSearch className="w-10 sm:w-12 h-10 sm:h-12 text-[#D4A017] mb-3 sm:mb-4 mx-auto" />
                        <h3 className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3 text-center">Cek Validitas Website</h3>
                        <p className="text-center text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Verifikasi keaslian website untuk menghindari informasi hoax dan judi online</p>
                    </div>
                    <div className="w-full rounded-md overflow-hidden text-white">                        <Link to="/validate-website" className="bg-[#D4A017] w-full h-10 sm:h-12 items-center justify-center flex gap-2 hover:bg-[#C09016] transition-colors text-sm sm:text-base">
                            Verifikasi Website <FaArrowRight className="w-3 sm:w-4 h-3 sm:h-4"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        {showMoodCheckTerms && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-8 text-center">
                    <h2 className="text-xl font-semibold mb-4 text-[#D4A017]">Persetujuan Penggunaan Kamera</h2>                    <p className="text-gray-700 mb-6">
                        Pada halaman berikutnya, Anda akan diminta untuk membuka kamera. Jangan khawatir, foto Anda <span className="font-semibold">tidak akan disimpan</span> dan hanya digunakan untuk keperluan mendeteksi mood saja.
                    </p>
                    <div className="flex items-center justify-center mb-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={dontShowAgain}
                                onChange={(e) => setDontShowAgain(e.target.checked)}
                                className="mr-2 h-4 w-4 text-[#D4A017] focus:ring-[#D4A017] border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-600">Jangan tampilkan pesan ini lagi</span>
                        </label>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleMoodCheckDisagree}
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                        >
                            Tidak Setuju
                        </button>
                        <button
                            onClick={handleMoodCheckAgree}
                            className="px-6 py-2 rounded-lg bg-[#D4A017] text-white hover:bg-[#C39316] transition cursor-pointer"
                        >
                            Setuju
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default HomePage;