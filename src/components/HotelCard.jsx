import React from 'react';

const HotelCard = ({ image, name, price, location, onClick }) => {
return (
    <div
    className="bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all text-white cursor-pointer h-[320px] flex flex-col"
    onClick={onClick}
    >
    <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover"
    />
    <div className="flex flex-col justify-between flex-grow p-4">
        <div>
        <h3 className="text-lg font-semibold leading-tight mb-1 line-clamp-2">{name}</h3>
        <p className="text-sm text-gray-300">{location}</p>
        </div>
        <div className="mt-auto text-yellow-400 font-bold text-md">₹{price}</div>
    </div>
    </div>
);
};

export default HotelCard;
