import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { Footer, Navbar } from "../components";
import { useState } from "react";

function LandingPage() {
    const [showTerms, setShowTerms] = useState(false);

    const handleTryNowClick = (e) => {
        e.preventDefault();
        setShowTerms(true);
    };

    const handleAgree = () => {
        setShowTerms(false);
        window.location.href = "/overview";
    };

    const handleDisagree = () => {
        setShowTerms(false);
    };

    return (
        <div className="w-full min-h-svh bg-[#FFEBC8]/80">
            <Navbar />
            <div className="min-h-svh flex items-center justify-center px-4 md:px-12">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#D4A017] leading-tight">
                        SoulFriend
                    </h1>
                    
                    <p className="text-xl md:text-2xl font-medium text-gray-800 mt-4 leading-relaxed">
                        Ceritakan suasana hatimu, dan biarkan kami menjadi teman baikmu yang selalu siap mendengarkan.
                    </p>
                    
                    <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/home"
                            className="inline-flex items-center justify-center gap-2 w-[208px] h-[52px] bg-[#D4A017] text-white text-lg rounded-lg hover:bg-[#C39316] transition-colors duration-300 shadow-md cursor-pointer"
                        >
                            Masuk Sekarang
                            <FaArrowRight className="ml-1" />
                        </Link>
                        <button
                            onClick={handleTryNowClick}
                            className="inline-flex items-center justify-center gap-2 w-[208px] h-[52px] bg-[#D4A017] text-white text-lg rounded-lg hover:bg-[#C39316] transition-colors duration-300 shadow-md cursor-pointer"
                        >
                            Coba Sekarang
                            <FaArrowRight className="ml-1" />
                        </button>
                    </div>
                    
                    <div className="mt-8 text-gray-500 text-sm">
                        Temukan ketenangan dan solusi untuk setiap suasana hatimu
                    </div>
                </div>
            </div>
            {showTerms && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
                        <h2 className="text-xl font-semibold mb-4 text-[#D4A017]">Persetujuan Penggunaan Kamera</h2>
                        <p className="text-gray-700 mb-6">
                            Pada halaman berikutnya, Anda akan diminta untuk membuka kamera. Jangan khawatir, foto Anda <span className="font-semibold">tidak akan disimpan</span> dan hanya digunakan untuk keperluan mendeteksi mood saja.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDisagree}
                                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                            >
                                Tidak Setuju
                            </button>
                            <button
                                onClick={handleAgree}
                                className="px-6 py-2 rounded-lg bg-[#D4A017] text-white hover:bg-[#C39316] transition cursor-pointer"
                            >
                                Setuju
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    )
}

export default LandingPage;