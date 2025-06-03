import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const token = Cookies.get("token");
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const handleLogout = () => {
        Cookies.remove("token");
        navigate("/login");
    };

    return (
        <nav className="bg-[#D4A017] w-full h-16 flex items-center justify-between fixed top-0 z-50 text-white px-4 md:px-12">
            <Link to="/" className="text-2xl font-semibold">SoulFriend</Link>
            
            <button 
                onClick={toggleMenu}
                className="md:hidden focus:outline-none"
                aria-label="Toggle menu"
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <div className="hidden md:flex items-center">
                {token ? (
                    <button 
                        onClick={handleLogout} 
                        className="px-4 hover:text-gray-200 flex items-center gap-2 cursor-pointer"
                    >
                        <FiLogOut /> Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="px-4 hover:text-gray-200 flex items-center gap-2 cursor-pointer">
                            <FiLogIn /> Sign In
                        </Link>
                        <Link to="/register" className="px-4 hover:text-gray-200 flex items-center gap-2 cursor-pointer">
                            <FiUserPlus /> Sign Up
                        </Link>
                    </>
                )}
            </div>
            
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-[#D4A017] p-4 md:hidden flex flex-col gap-2">
                    {token ? (
                        <button 
                            onClick={() => {
                                handleLogout();
                                toggleMenu();
                            }}
                            className="px-4 py-2 hover:bg-[#C39316] rounded flex items-center gap-2 text-left cursor-pointer"
                        >
                            <FiLogOut /> Logout
                        </button>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="px-4 py-2 hover:bg-[#C39316] rounded flex items-center gap-2 cursor-pointer"
                                onClick={toggleMenu}
                            >
                                <FiLogIn /> Sign In
                            </Link>
                            <Link 
                                to="/register" 
                                className="px-4 py-2 hover:bg-[#C39316] rounded flex items-center gap-2 cursor-pointer"
                                onClick={toggleMenu}
                            >
                                <FiUserPlus /> Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;