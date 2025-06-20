import React from 'react';

const HotelCard = ({ image, name, price, location }) => {
return (
    <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow hover:shadow-md transition-all text-white">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
        <h3 className="text-md font-semibold">{name}</h3>
        <p className="text-sm text-yellow-400 font-bold mt-1">${price} <span className="text-xs text-gray-400">/ Night</span></p>
        <p className="text-xs text-gray-400 mt-1">{location}</p>
    </div>
    </div>
);
};

export default HotelCard;
