import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

const Hero = () => {
const [hotels, setHotels] = useState([]);
const [selectedHotel, setSelectedHotel] = useState(null);
const navigate = useNavigate();

// Fetch hotel data
useEffect(() => {
    fetch('https://stayfinder-backend-v1.onrender.com/api/hotels')
    .then((res) => res.json())
    .then((data) => {
        setHotels(data);
        if (data.length > 0) {
        const randomHotel = data[Math.floor(Math.random() * data.length)];
        setSelectedHotel(randomHotel);
        }
    })
    .catch((err) => console.error('Failed to fetch hotels:', err));
}, []);

const handleBookClick = () => {
    if (selectedHotel) {
    navigate(`/hotel/${selectedHotel.id}`);
    }
};

if (!selectedHotel) {
    return (
    <div className="h-[90vh] flex items-center justify-center text-white text-lg bg-[#0f172a]">
        Loading your dream stay...
    </div>
    );
}

return (
    <header
    className="relative h-[90vh] bg-cover bg-center text-white"
    style={{ backgroundImage: `url(${selectedHotel.mainImage})` }}
    >
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>

    {/* Main Content */}
    <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Chase elegance. Reserve your dream stay now.
        </h1>
        <p className="text-lg text-gray-200">{selectedHotel.description || 'Explore handpicked stays.'}</p>
    </div>

    {/* Search Bar */}
    <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 w-[95%] max-w-6xl px-4 py-3 md:py-4 bg-[#1e293b] rounded-xl shadow-xl text-white z-20 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        {/* Location */}
        <div className="flex items-center gap-2 border-r border-gray-600 pr-2">
            <FiMapPin className="text-lg" />
            <div>
            <p className="text-sm font-semibold">Where?</p>
            <p className="text-xs text-gray-300">{selectedHotel.city}</p>
            </div>
        </div>

        {/* Check-in */}
        <div className="flex items-center gap-2 border-r border-gray-600 pr-2">
            <FiCalendar className="text-lg" />
            <div>
            <p className="text-sm font-semibold">Check in</p>
            <p className="text-xs text-gray-300">09 Jul 2024</p>
            </div>
        </div>

        {/* Check-out */}
        <div className="flex items-center gap-2 border-r border-gray-600 pr-2">
            <FiCalendar className="text-lg" />
            <div>
            <p className="text-sm font-semibold">Check out</p>
            <p className="text-xs text-gray-300">10 Jul 2024</p>
            </div>
        </div>

        {/* Guests */}
        <div className="flex items-center gap-2">
            <FiUsers className="text-lg" />
            <div>
            <p className="text-sm font-semibold">Rooms | Adults, Children</p>
            <p className="text-xs text-gray-300">01 | 02</p>
            </div>
        </div>
        </div>

        {/* Book Button */}
        <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center md:justify-end">
        <button
            onClick={handleBookClick}
            className="w-full md:w-fit bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-md font-medium transition"
        >
            Book
        </button>
        </div>
    </div>
    </header>
);
};

export default Hero;
