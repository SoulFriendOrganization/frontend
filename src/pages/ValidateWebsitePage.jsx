import { IoReturnDownBack, IoEnterOutline } from "react-icons/io5";
import { Link } from "react-router";
import { TbWorldWww } from "react-icons/tb";
import { StreamText } from "../components";
import { useForm } from "react-hook-form";

function ValidateWebsitePage() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();

    const onSubmit = (data) => {
        console.log("Website URL:", data.websiteUrl);
    };    
    return (
        <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col justify-center items-center">
            <Link to="/home">
                <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
            </Link>
            <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 py-6 sm:py-8 space-y-3 sm:space-y-4 mx-auto">
                <TbWorldWww className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#D4A017]" />
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">Masukkan Link Website</h1>
                <form 
                    className="flex items-center w-full sm:w-4/5 md:w-3/4 relative"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input 
                        type="text" 
                        className={`ring-2 ${errors.websiteUrl ? "ring-red-500" : "ring-[#D4A017]"} rounded-full w-full focus:outline-none px-3 sm:px-4 md:px-5 py-2 sm:py-3 pr-12 sm:pr-14 text-base sm:text-lg`}
                        placeholder="Ketik link web di sini..."
                        {...register("websiteUrl", { 
                            required: "URL website diperlukan",                            
                            pattern: {
                                value: new RegExp('^(https?://)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}([/?#].*)?$'),
                                message: "Format URL tidak valid"
                            }
                        })}
                    />
                    <button 
                        type="submit"
                        className="absolute right-1 bg-[#D4A017] text-white p-2 sm:p-3 rounded-full hover:bg-[#C39316] transition-colors cursor-pointer"
                    >
                        <IoEnterOutline size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                </form>
                {errors.websiteUrl && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.websiteUrl.message}</p>
                )}
                <p className="text-center max-w-md px-2 sm:px-0">
                <StreamText text="Lorem ipsum dolor sit amet consectetur, adipisicing elit."/>
                </p>
            </div>
        </div>
    )
}

export default ValidateWebsitePage;