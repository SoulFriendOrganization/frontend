import authBgImage from '/authBg.svg';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        watch, 
        reset 
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: '',
            age: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    });

    const password = watch('password');

    const onSubmit = (data) => {
        console.log(data);
        // Here you would handle the form submission to your API
        alert('Registration successful!');
        reset();
    };

    return (
        <div className="min-h-svh w-full bg-[#FFEBC8]">
            <div className="flex flex-col md:flex-row h-svh">
                <div className="flex-1 flex flex-col items-center justify-center p-8">                      
                    <div className="w-full max-w-lg">
                        <h1 className="text-3xl font-bold text-[#D4A017] mb-6 text-center">Sign Up</h1>
                        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>                            
                            <div className="mb-5">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Full Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name"
                                    placeholder="Enter your full name"
                                    {...register('name', { 
                                        required: 'Full name is required',
                                        minLength: { 
                                            value: 2, 
                                            message: 'Name must be at least 2 characters' 
                                        }
                                    })}
                                    className={`w-full p-3 bg-[#FFF8EB] border-2 ${errors.name ? 'border-red-500' : 'border-[#D4A017]/20'} rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
                            </div>
                            
                            <div className="mb-5">
                                <label htmlFor="age" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Age
                                </label>
                                <input 
                                    type="number"
                                    id="age"
                                    placeholder="Enter your age"
                                    min="1"
                                    {...register('age', { 
                                        required: 'Age is required',
                                        min: { 
                                            value: 1, 
                                            message: 'Age must be at least 1' 
                                        },
                                        max: {
                                            value: 120,
                                            message: 'Age must be less than 120'
                                        },
                                        valueAsNumber: true
                                    })}
                                    className={`w-full p-3 bg-[#FFF8EB] border-2 ${errors.age ? 'border-red-500' : 'border-[#D4A017]/20'} rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400`}
                                />
                                {errors.age && <p className="text-red-500 text-xs mt-1 ml-1">{errors.age.message}</p>}
                            </div>
                            
                            <div className="mb-5">
                                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Username
                                </label>
                                <input 
                                    type="text"
                                    id="username"
                                    placeholder="Choose a username"
                                    {...register('username', { 
                                        required: 'Username is required',
                                        minLength: { 
                                            value: 3, 
                                            message: 'Username must be at least 3 characters' 
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]+$/,
                                            message: 'Username can only contain letters, numbers and underscores'
                                        }
                                    })}
                                    className={`w-full p-3 bg-[#FFF8EB] border-2 ${errors.username ? 'border-red-500' : 'border-[#D4A017]/20'} rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400`}
                                />
                                {errors.username && <p className="text-red-500 text-xs mt-1 ml-1">{errors.username.message}</p>}
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
                                        {...register('password', { 
                                            required: 'Password is required',
                                            minLength: { 
                                                value: 8, 
                                                message: 'Password must be at least 8 characters' 
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
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
                            <div className="mb-5">
                                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2 ml-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        {...register('confirmPassword', { 
                                            required: 'Please confirm your password',
                                            validate: value => value === password || 'The passwords do not match'
                                        })}
                                        className={`w-full p-3 bg-[#FFF8EB] border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-[#D4A017]/20'} rounded-lg focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] transition-all duration-200 placeholder-gray-400 pr-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-[#D4A017] focus:outline-none"
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>}
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