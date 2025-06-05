import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { TbAlertTriangle } from "react-icons/tb";

function ErrorPage() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-center px-4 md:px-12 bg-[#FFEBC8]">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <div className="flex justify-center">
                    <TbAlertTriangle className="text-[#D4A017] text-7xl md:text-8xl" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#D4A017]">Oops!</h1>
                <p className="text-xl md:text-2xl font-medium text-gray-800 mt-4 leading-relaxed">
                    Terjadi kesalahan pada sistem. Silakan coba kembali nanti.
                </p>
                
                <div className="mt-8 md:mt-12 flex justify-center">
                    <Link 
                        to="/"
                        className="inline-flex items-center justify-center gap-2 w-[208px] h-[52px] bg-[#D4A017] text-white text-lg rounded-lg hover:bg-[#C39316] transition-colors duration-300 shadow-md cursor-pointer"
                    >
                        <FaArrowLeft className="mr-1" />
                        Kembali ke Beranda
                    </Link>
                </div>
                
                <div className="mt-8 text-gray-500 text-sm">
                    Jika masalah berlanjut, hubungi tim dukungan kami
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;