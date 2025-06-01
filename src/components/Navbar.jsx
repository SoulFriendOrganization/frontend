import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#D4A017] w-full h-16 flex items-center justify-between fixed top-0 z-50 text-white px-4 md:px-12">
            <Link to="/" className="text-2xl font-semibold">SoulFriend</Link>
            
            {/* Mobile menu button */}
            <button 
                onClick={toggleMenu}
                className="md:hidden focus:outline-none"
                aria-label="Toggle menu"
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
                <Link to="/login" className="px-4 hover:text-gray-200 flex items-center gap-2">
                    <FiLogIn /> Sign In
                </Link>
                <Link to="/register" className="px-4 hover:text-gray-200 flex items-center gap-2">
                    <FiUserPlus /> Sign Up
                </Link>
            </div>
            
            {/* Mobile Navigation */}
            {isOpen && (
                <div className="absolute top-16 left-0 right-0 bg-[#D4A017] p-4 md:hidden flex flex-col gap-2">
                    <Link 
                        to="/login" 
                        className="px-4 py-2 hover:bg-[#C39316] rounded flex items-center gap-2"
                        onClick={toggleMenu}
                    >
                        <FiLogIn /> Sign In
                    </Link>
                    <Link 
                        to="/register" 
                        className="px-4 py-2 hover:bg-[#C39316] rounded flex items-center gap-2"
                        onClick={toggleMenu}
                    >
                        <FiUserPlus /> Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;