import React, { useState } from 'react';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const toggleMenu = () => setIsOpen(!isOpen);

return (
    <nav className="bg-[#10144c] text-white w-full fixed top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold tracking-wider">StayFinder</div>
            <div className="hidden md:flex space-x-8 mx-auto text-center">
                <a href="#" className="hover:text-cyan-300 transition font-medium">Home</a>
                <a href="#" className="hover:text-cyan-300 transition font-medium">Explore</a>
                <a href="#" className="hover:text-cyan-300 transition font-medium">Bookings</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="border-2 border-white px-4 py-1.5 rounded-md font-semibold hover:bg-white hover:text-[#10144c] transition">Register</a>
                <a href="#" className="bg-white text-[#10144c] px-4 py-1.5 rounded-md font-semibold hover:bg-[#10144c] hover:text-white hover:border-white hover:border-2 hover:rounded-md transition">Sign In</a>
                <button className="bg-white text-black p-2 rounded hover:bg-gray-100 transition">
                    <FiSearch size={18} />
                </button>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMenu}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </div>
        <div className={`fixed top-0 right-0 h-full w-64 bg-[#10144c] text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden shadow-lg z-50`}>
            <div className="flex justify-between items-center p-4 border-b border-white/20">
                <span className="text-xl font-semibold">Menu</span>
                <button onClick={toggleMenu}><FiX size={24} /></button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
                <a href="#" className="text-lg hover:text-cyan-300 transition" onClick={toggleMenu}>Home</a>
                <a href="#" className="text-lg hover:text-cyan-300 transition" onClick={toggleMenu}>Explore</a>
                <a href="#" className="text-lg hover:text-cyan-300 transition" onClick={toggleMenu}>Bookings</a>
                <a href="#" className="border-2 border-white px-4 py-2 rounded-md text-center font-semibold hover:bg-white hover:text-[#10144c] transition" onClick={toggleMenu}>Register</a>
                <a href="#" className="bg-white text-[#10144c] px-4 py-2 rounded-md text-center font-semibold hover:bg-[#10144c] hover:text-white hover:border-white hover:border-2 hover:rounded-md transition" onClick={toggleMenu}>Sign In</a>
                <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition flex items-center gap-2">
                    <FiSearch size={18} />
                    <span>Search</span>
                </button>
            </div>
        </div>
    </nav>
);
};

export default Navbar;
