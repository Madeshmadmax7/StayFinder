import React, { useEffect, useState } from 'react';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import img1 from '../images/dubai.jpg';
import img2 from '../images/paris.jpg';
import img3 from '../images/singapore.jpg';


const famousSpots = [
    {
        location: "Singapore",
        description: "Discover the finest hotels from all over the world.",
        image: img3,
    },
    {
        location: "Paris",
        description: "Enjoy the romantic city with a luxurious stay.",
        image: img2,
    },
    {
        location: "Dubai",
        description: "Experience the luxury in the desert oasis.",
        image: img1,
    },
];


const Hero = () => {
const [spot, setSpot] = useState(famousSpots[0]);

useEffect(() => {
    const randomSpot = famousSpots[Math.floor(Math.random() * famousSpots.length)];
    setSpot(randomSpot);
}, []);

return (
    <header
    className="relative bg-cover bg-center h-[90vh] text-white bg-gray-800"
    style={{ backgroundImage: `url(${spot.image})` }}
    >
    <div className="absolute inset-0 bg-opacity-25"></div>
    <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-6">
        <h1 className="text-4xl md:text-4xl font-bold mb-4">Chase elegance. Reserve your dream stay now.</h1>
        <p className="text-lg text-gray-200">{spot.description}</p>
    </div>
    <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 bg-white text-[#10144c] shadow-lg rounded-xl w-[95%] max-w-6xl px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">

        <div className="flex items-center gap-2 border-r pr-2">
        <FiMapPin className="text-lg" />
        <div>
            <p className="text-sm font-semibold">Where?</p>
            <p className="text-xs text-gray-600">{spot.location}</p>
        </div>
        </div>

        <div className="flex items-center gap-2 border-r pr-2">
        <FiCalendar className="text-lg" />
        <div>
            <p className="text-sm font-semibold">Check in</p>
            <p className="text-xs text-gray-600">09 Jul 2024</p>
        </div>
        </div>
        <div className="flex items-center gap-2 border-r pr-2">
        <FiCalendar className="text-lg" />
        <div>
            <p className="text-sm font-semibold">Check out</p>
            <p className="text-xs text-gray-600">10 Jul 2024</p>
        </div>
        </div>
        <div className="flex items-center gap-2">
        <FiUsers className="text-lg" />
        <div>
            <p className="text-sm font-semibold">Rooms | Adults, Children</p>
            <p className="text-xs text-gray-600">01 | 02</p>
        </div>
        </div>
    </div>

    <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center md:justify-end">
        <button className="bg-[#10144c] text-white px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base rounded-md font-semibold hover:bg-[#0c1138] transition w-full md:w-fit">
            Book Now
        </button>
    </div>
    </div>
    </header>
);
};

export default Hero;
