import { IoReturnDownBack, IoEnterOutline } from "react-icons/io5";
import { Link } from "react-router";
import { TbWorldWww } from "react-icons/tb";
import { StreamText } from "../components/atoms";

function ValidateWebsitePage() {
    return (
        <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col justify-center items-center">
            <Link to="/home">
                <IoReturnDownBack className="absolute top-10 left-10 cursor-pointer w-10 h-10"/>
            </Link>
            <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 py-8 space-y-4">
                <TbWorldWww className="w-20 h-20 text-[#D4A017]" />
                <h1 className="font-bold text-4xl">Masukkan Link Website</h1>
                <div 
                    className="flex items-center w-xl relative"
                >
                    <input 
                    type="text" 
                    className="ring-2 ring-[#D4A017] rounded-full w-full focus:outline-none px-5 py-3 pr-14 text-lg"
                    placeholder="Ketik nama Anda di sini..."
                    />
                    <button 
                    type="submit"
                    className="absolute right-1 bg-[#D4A017] text-white p-3 rounded-full hover:bg-[#C39316] transition-colors cursor-pointer"
                    >
                        <IoEnterOutline size={22} />
                    </button>
                </div>
                <p>
                <StreamText text="Lorem ipsum dolor sit amet consectetur, adipisicing elit."/>
                </p>
            </div>
        </div>
    )
}

export default ValidateWebsitePage;