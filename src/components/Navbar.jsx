import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { HotelContext } from '../context/HotelContext';

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const [showSearchBox, setShowSearchBox] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [searchPlaceholder, setSearchPlaceholder] = useState('Search places...');
const navigate = useNavigate();

const toggleMenu = () => setIsOpen(!isOpen);
const isLoggedIn = !!localStorage.getItem('token');

const { hotels } = useContext(HotelContext);

const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
};

const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const lower = searchQuery.trim().toLowerCase();

    const foundHotel = hotels.find(hotel =>
    hotel.name.toLowerCase().includes(lower) ||
    hotel.city.toLowerCase().includes(lower)
    );

    if (foundHotel) {
    setShowSearchBox(false);
    setSearchQuery('');
    setSearchPlaceholder('Search places...');
    navigate(`/hotel/${foundHotel.id}`);
    } else {
    setSearchQuery('');
    setSearchPlaceholder('Not available');
    }
};

const handleSearchKey = (e) => {
    if (e.key === 'Enter') {
    handleSearch();
    }
};

return (
    <nav className="bg-[#0f172a] text-white w-full fixed top-0 z-50 shadow-md">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider z-10">StayFinder</div>

        {/* Center Links */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-center">
        <Link to="/home" className="hover:text-cyan-300 transition font-medium">Home</Link>
        <Link to="/explore" className="hover:text-cyan-300 transition font-medium">Explore</Link>
        <Link to="/booking" className="hover:text-cyan-300 transition font-medium">Bookings</Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4 z-10">
        {isLoggedIn ? (
            <button
            onClick={handleLogout}
            className="border-2 border-white px-4 py-1.5 rounded-md font-semibold hover:bg-white hover:text-[#0f172a] transition"
            >
            Logout
            </button>
        ) : (
            <Link
            to="/login"
            className="border-2 border-white px-4 py-1.5 rounded-md font-semibold hover:bg-white hover:text-[#0f172a] transition"
            >
            Sign In
            </Link>
        )}

        {/* Search Icon / Box */}
        <div className="relative">
            {!showSearchBox ? (
            <button
                onClick={() => setShowSearchBox(true)}
                className="bg-white text-black p-2 rounded-md hover:bg-gray-100 transition w-10 text-center"
            >
                <FiSearch size={18} />
            </button>
            ) : (
            <div className="flex items-center bg-white rounded-md overflow-hidden w-72">
                <input
                type="text"
                placeholder={searchPlaceholder}
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                className="flex-grow px-4 py-2 bg-white text-black focus:outline-none"
                />
                <button
                onClick={handleSearch}
                className="px-3 text-black hover:text-blue-600"
                >
                <FiSearch />
                </button>
                <button
                onClick={() => {
                    setShowSearchBox(false);
                    setSearchQuery('');
                    setSearchPlaceholder('Search places...');
                }}
                className="p-2 text-black hover:text-red-500 transition"
                >
                <FiX size={20} />
                </button>
            </div>
            )}
        </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-20">
        <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        </div>
    </div>

    {/* Mobile Menu Slide-out */}
    <div className={`fixed top-0 right-0 h-full w-64 bg-[#0f172a] text-white transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden shadow-lg z-40`}>
        <div className="flex justify-between items-center p-4 border-b border-white/20">
        <span className="text-xl font-semibold">Menu</span>
        <button onClick={toggleMenu}><FiX size={24} /></button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
        <Link to="/home" className="text-lg hover:text-cyan-300 transition" onClick={toggleMenu}>Home</Link>
        <Link to="/explore" className="text-lg hover:text-cyan-300 transition" onClick={toggleMenu}>Explore</Link>
        <Link to="/booking" className="text-lg hover:text-cyan-300 transition" onClick={toggleMenu}>Bookings</Link>

        {isLoggedIn ? (
            <button
            onClick={() => {
                handleLogout();
                toggleMenu();
            }}
            className="border-2 border-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-[#0f172a] transition"
            >
            Logout
            </button>
        ) : (
            <Link
            to="/login"
            className="border-2 border-white px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-[#0f172a] transition"
            onClick={toggleMenu}
            >
            Sign In
            </Link>
        )}

        {/* Search in mobile */}
        {!showSearchBox ? (
            <button
            onClick={() => setShowSearchBox(true)}
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
            <FiSearch size={18} />
            <span className="font-medium">Search</span>
            </button>
        ) : (
            <div className="flex items-center bg-white rounded-md overflow-hidden w-full">
            <input
                type="text"
                placeholder={searchPlaceholder}
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                className="flex-grow px-4 py-2 bg-white text-black focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="px-3 text-black hover:text-blue-600"
            >
                <FiSearch />
            </button>
            <button
                onClick={() => {
                setShowSearchBox(false);
                setSearchQuery('');
                setSearchPlaceholder('Search places...');
                }}
                className="p-2 text-black hover:text-red-500 transition"
            >
                <FiX size={20} />
            </button>
            </div>
        )}
        </div>
    </div>
    </nav>
);
};

export default Navbar;
