import { IoReturnDownBack, IoEnterOutline } from "react-icons/io5";
import { Link } from "react-router";
import { TbWorldWww } from "react-icons/tb";
import { StreamText } from "../components";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {validateWebsiteService} from "../services";
import { useState } from "react";

function ValidateWebsitePage() {    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm();    
    
    const onSubmit = (formData) => {
        validateWebsiteService(formData.url, setData, setLoading);
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
                >                    <input 
                        type="text" 
                        className={`ring-2 ${errors.url ? "ring-red-500" : "ring-[#D4A017]"} rounded-full w-full focus:outline-none px-3 sm:px-4 md:px-5 py-2 sm:py-3 pr-12 sm:pr-14 text-base sm:text-lg`}
                        placeholder="Ketik link web di sini..."
                        {...register("url", { 
                            required: "URL website diperlukan",                            
                            pattern: {
                                value: new RegExp('^(https?://)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}([/?#].*)?$'),
                                message: "Format URL tidak valid"
                            }
                        })}
                    />                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`absolute right-1 bg-[#D4A017] text-white p-2 sm:p-3 rounded-full ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#C39316] cursor-pointer'} transition-colors`}
                    >
                        {loading ? (
                            <FaSpinner className="sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin" />
                        ) : (
                            <IoEnterOutline size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        )}
                    </button>
                </form>                {errors.url && (
                    <div className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-500 text-xs sm:text-sm">{errors.url.message}</p>
                    </div>
                )}
                <p className="text-center max-w-md px-2 sm:px-0">
                    <StreamText text="Masukkan URL website untuk memvalidasi keamanan dan kesesuaiannya."/>
                </p>
                        
                {loading && (
                    <div className="mt-6 flex flex-col items-center">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full border-4 border-[#FFE4A0] border-t-[#D4A017] animate-spin"></div>
                            <FaSpinner className="w-6 h-6 text-[#D4A017] animate-spin absolute top-3 left-3" />
                        </div>
                        <p className="mt-3 text-sm sm:text-base font-medium text-[#D4A017]">Sedang memvalidasi website...</p>
                    </div>
                )}{!loading && data && (
                    <div className="mt-6 w-full max-w-2xl">
                        <h2 className="font-bold text-lg sm:text-xl mb-4 text-[#D4A017] border-b-2 border-[#D4A017] pb-2 inline-block">Hasil Validasi</h2>
                        
                        {data.is_harmful === null ? (
                            <div className="p-3 rounded-lg border border-[#D4A017] bg-[#FFF8E8] mt-2">
                                <p className="text-sm sm:text-base text-red-600 font-medium">{data.summary_harmful}</p>
                            </div>
                        ) : (
                            <>
                                <div className={`flex items-center mb-3 ${data.is_harmful ? 'text-red-700' : 'text-green-700'}`}>
                                    <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${data.is_harmful ? 'bg-red-500' : 'bg-green-500'}`}>
                                        {data.is_harmful ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="font-semibold text-base sm:text-lg">
                                        {data.is_harmful ? 'Website Tidak Aman' : 'Website Aman'}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg border border-[#D4A017] bg-[#FFF8E8]">
                                    <h3 className="text-sm font-semibold text-[#D4A017] mb-2 border-b border-[#FFE4A0] pb-1">Ringkasan Analisis</h3>
                                    <p className="text-sm sm:text-base text-gray-700">
                                        {data.summary_harmful}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ValidateWebsitePage;