import authBgImage from '/authBg.svg';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import { loginService } from '../services';
import { IoReturnDownBack } from "react-icons/io5";


function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { 
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        loginService(data, setError, setLoading, navigate, reset);
    };
    
    return (
        <div className="min-h-svh w-full bg-[#FFEBC8]">
            <Link to="/">
                <IoReturnDownBack className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"/>
            </Link>
            <div className="flex flex-col md:flex-row h-svh">
                <div className="flex-1 flex flex-col items-center justify-center p-8">                      
                    <div className="w-full max-w-lg">
                        <h1 className="text-3xl font-bold text-[#D4A017] mb-6 text-center">Sign In</h1>                        
                        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5">
                                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Username
                                </label>
                                <input 
                                    type="text" 
                                    id="username"
                                    placeholder="Enter your username" 
                                    {...register('username', { 
                                        required: 'Username is required',
                                        minLength: { 
                                            value: 3, 
                                            message: 'Username must be at least 3 characters' 
                                        }
                                    })}
                                    className={`w-full p-3 bg-[#FFF8EB] border-2 ${errors.username ? 'border-red-500' : 'border-[#D4A017]/20'} rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400`}
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1 ml-1">{errors.username.message}</p>}
                            </div>                            
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter your password" 
                                        {...register('password', { 
                                            required: 'Password is required',
                                            minLength: { 
                                                value: 8, 
                                                message: 'Password must be at least 8 characters' 
                                            }
                                        })}
                                        className={`w-full p-3 bg-[#FFF8EB] border-2 ${errors.password ? 'border-red-500' : 'border-[#D4A017]/20'} rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400 pr-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-[#D4A017] focus:outline-none"
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
                            </div>
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg">
                                    {error}
                                </div>
                            )}
                            <button 
                                type="submit" 
                                className="w-full bg-[#D4A017] text-white py-3 rounded-lg font-medium hover:bg-[#C39316] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>                            
                            <p className="text-center mt-4 text-sm text-gray-600">
                                Don't have an account? <a href="/register" className="text-[#D4A017] hover:underline">Sign Up</a>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block flex-1 bg-center bg-cover" style={{ backgroundImage: `url(${authBgImage})` }} />            
                </div>
        </div>
    );
}

export default LoginPage;