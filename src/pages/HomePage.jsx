import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { TbMoodWink, TbBrain, TbBook, TbSearch, TbMoodSmile, TbAward, TbChartBar, TbCalendarStats } from "react-icons/tb";


function HomePage() {
  return (
    <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col items-center">
        <div className="px-4 flex flex-col items-center justify-center w-full max-w-7xl mx-auto min-h-svh">
            <div className="mb-12 flex flex-col items-center justify-center py-8 px-12 rounded-lg bg-white/50 shadow-sm">
                <h1 className="font-bold text-3xl mb-3 text-center">Bagaimana Perasaanmu Hari Ini?</h1>
                <p className="text-center text-gray-700 mb-6">Lakukan pengecekan mood harian untuk memahami kondisi mental Anda</p>
                <div className="w-full max-w-xs rounded-md overflow-hidden text-white">
                    <Link to="/mood-check" className="bg-[#D4A017] w-full h-14 items-center justify-center flex gap-2 font-medium hover:bg-[#C09016] transition-colors">
                        Cek Mood Sekarang <TbMoodWink className="w-6 h-6"/>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="flex flex-col items-center justify-between p-6 rounded-lg bg-white/50 shadow-sm h-full">
                    <div>
                        <TbBrain className="w-12 h-12 text-[#D4A017] mb-4 mx-auto" />
                        <h3 className="font-semibold text-xl mb-3 text-center">Quiz Mental Health</h3>
                        <p className="text-center text-gray-700 mb-6">Uji pengetahuan Anda tentang kesehatan mental melalui quiz interaktif</p>
                    </div>
                    <div className="w-full rounded-md overflow-hidden text-white">
                        <Link to="/quiz" className="bg-[#D4A017] w-full h-12 items-center justify-center flex gap-2 hover:bg-[#C09016] transition-colors">
                            Mulai Quiz <FaArrowRight className="w-4 h-4"/>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between p-6 rounded-lg bg-white/50 shadow-sm h-full">
                    <div>
                        <TbBook className="w-12 h-12 text-[#D4A017] mb-4 mx-auto" />
                        <h3 className="font-semibold text-xl mb-3 text-center">Edukasi Mental Health</h3>
                        <p className="text-center text-gray-700 mb-6">Pelajari tentang kesehatan mental dan cara mengidentifikasi informasi hoax</p>
                    </div>
                    <div className="w-full rounded-md overflow-hidden text-white">
                        <Link to="/edu" className="bg-[#D4A017] w-full h-12 items-center justify-center flex gap-2 hover:bg-[#C09016] transition-colors">
                            Belajar Sekarang <FaArrowRight className="w-4 h-4"/>
                        </Link>
                    </div>
                </div>
                
                <div className="flex flex-col items-center justify-between p-6 rounded-lg bg-white/50 shadow-sm h-full">
                    <div>
                        <TbSearch className="w-12 h-12 text-[#D4A017] mb-4 mx-auto" />
                        <h3 className="font-semibold text-xl mb-3 text-center">Cek Validitas Website</h3>
                        <p className="text-center text-gray-700 mb-6">Verifikasi keaslian website untuk menghindari informasi hoax</p>
                    </div>
                    <div className="w-full rounded-md overflow-hidden text-white">
                        <Link to="/validate-website" className="bg-[#D4A017] w-full h-12 items-center justify-center flex gap-2 hover:bg-[#C09016] transition-colors">
                            Verifikasi Website <FaArrowRight className="w-4 h-4"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
          <div className="w-full bg-white/70 min-h-svh flex items-center justify-center px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Statistik Perkembangan Anda</h2>
                <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
                    <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center w-full md:max-w-xs">
                        <div className="bg-[#FFE2A8] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <TbMoodSmile className="w-9 h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-1 text-center">Mood Hari Ini</h3>
                        <p className="text-2xl font-bold text-[#D4A017] capitalize">Senang</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center w-full md:max-w-xs">
                        <div className="bg-[#FFE2A8] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <TbAward className="w-9 h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-1 text-center">Poin Terkumpul</h3>
                        <p className="text-2xl font-bold text-[#D4A017]">8</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center w-full md:max-w-xs">
                        <div className="bg-[#FFE2A8] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <TbChartBar className="w-9 h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 mb-1 text-center">Skor Mental Health</h3>
                        <p className="text-2xl font-bold text-[#D4A017]">80/100</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-8 w-full">
                    <div className="flex items-center mb-6">
                        <div className="bg-[#FFE2A8] w-16 h-16 rounded-full flex items-center justify-center mr-5">
                            <TbCalendarStats className="w-9 h-9 text-[#D4A017]" />
                        </div>
                        <h3 className="font-semibold text-gray-600 text-2xl">Mood Bulanan</h3>
                    </div>
                    <div className="min-h-[250px] flex items-center justify-center">
                        <p className="text-sm text-gray-500">Grafik akan tersedia saat data terkumpul</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default HomePage;