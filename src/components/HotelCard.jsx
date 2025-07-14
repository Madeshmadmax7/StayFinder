import React from 'react';

const HotelCard = ({ image, name, price, location, onClick }) => {
    return (
        <div
        className="bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all text-white cursor-pointer"
        onClick={onClick}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-300">{location}</p>
                <p className="text-yellow-400 font-bold text-md mt-1">₹{price}</p>
            </div>
        </div>
    );
};

export default HotelCard;
