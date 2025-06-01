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
        // Here you can add your validation or API call logic
    };

    return (
        <div className="w-full min-h-svh bg-[#FFEBC8] flex flex-col justify-center items-center">
            <Link to="/home">
                <IoReturnDownBack className="absolute top-10 left-10 cursor-pointer w-10 h-10"/>
            </Link>
            <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4 py-8 space-y-4">
                <TbWorldWww className="w-20 h-20 text-[#D4A017]" />
                <h1 className="font-bold text-4xl">Masukkan Link Website</h1>
                <form 
                    className="flex items-center w-xl relative"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input 
                        type="text" 
                        className={`ring-2 ${errors.websiteUrl ? "ring-red-500" : "ring-[#D4A017]"} rounded-full w-full focus:outline-none px-5 py-3 pr-14 text-lg`}
                        placeholder="Ketik link web di sini..."
                        {...register("websiteUrl", { 
                            required: "URL website diperlukan",                            pattern: {
                                value: new RegExp('^(https?://)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}([/?#].*)?$'),
                                message: "Format URL tidak valid"
                            }
                        })}
                    />
                    <button 
                        type="submit"
                        className="absolute right-1 bg-[#D4A017] text-white p-3 rounded-full hover:bg-[#C39316] transition-colors cursor-pointer"
                    >
                        <IoEnterOutline size={22} />
                    </button>
                </form>
                {errors.websiteUrl && (
                    <p className="text-red-500 text-sm">{errors.websiteUrl.message}</p>
                )}
                <p>
                <StreamText text="Lorem ipsum dolor sit amet consectetur, adipisicing elit."/>
                </p>
            </div>
        </div>
    )
}

export default ValidateWebsitePage;