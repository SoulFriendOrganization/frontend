import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

function LandingPage() {
    return (
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
                    <Link 
                        to="/overview"
                        className="inline-flex items-center justify-center gap-2 w-[208px] h-[52px] bg-[#D4A017] text-white text-lg rounded-lg hover:bg-[#C39316] transition-colors duration-300 shadow-md cursor-pointer"
                    >
                        Coba Sekarang
                        <FaArrowRight className="ml-1" />
                    </Link>
                </div>
                
                <div className="mt-8 text-gray-500 text-sm">
                    Temukan ketenangan dan solusi untuk setiap suasana hatimu
                </div>
            </div>
        </div>
    )
}

export default LandingPage;