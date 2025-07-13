import React from 'react';

const HotelCard = ({ image, name, price, location }) => {
return (
    <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all text-white h-[320px] flex flex-col justify-between">
    <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover object-center"
    />
    <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 truncate">{name}</h3>
        <p className="text-sm text-yellow-400 font-semibold">
        ₹{price}{' '}
        <span className="text-xs text-gray-400">/ Night</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{location}</p>
    </div>
    </div>
);
};

export default HotelCard;
