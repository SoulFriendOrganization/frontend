import authBgImage from '/authBg.svg';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-svh w-full bg-[#FFEBC8]">
            <div className="flex flex-col md:flex-row h-svh">
                <div className="flex-1 flex flex-col items-center justify-center p-8">                      
                    <div className="w-full max-w-lg">
                        <h1 className="text-3xl font-bold text-[#D4A017] mb-6 text-center">Sign Up</h1>
                        <form className="p-8">                            
                            <div className="mb-5">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Email Address
                                </label><input 
                                    type="email" 
                                    id="email"
                                    placeholder="Enter your email address" 
                                    className="w-full p-3 bg-[#FFF8EB] border-2 border-[#D4A017]/20 rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Username
                                </label><input 
                                    type="text" 
                                    id="username"
                                    placeholder="Choose a username" 
                                    className="w-full p-3 bg-[#FFF8EB] border-2 border-[#D4A017]/20 rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400"
                                />
                            </div>                            
                            <div className="mb-5">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter your password" 
                                        className="w-full p-3 bg-[#FFF8EB] border-2 border-[#D4A017]/20 rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-[#D4A017] focus:outline-none"
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                            </div>                            
                            <div className="mb-5">
                                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        placeholder="Confirm your password" 
                                        className="w-full p-3 bg-[#FFF8EB] border-2 border-[#D4A017]/20 rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-[#D4A017] focus:outline-none"
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-[#D4A017] text-white py-3 rounded-lg font-medium hover:bg-[#C39316] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Create Account
                            </button>
                            
                            <p className="text-center mt-4 text-sm text-gray-600">
                                Already have an account? <a href="/login" className="text-[#D4A017] hover:underline">Sign In</a>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="hidden md:block flex-1 bg-center bg-cover" style={{ backgroundImage: `url(${authBgImage})` }} />            
                </div>
        </div>
    );
}

export default RegisterPage;