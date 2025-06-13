import React, { useState } from 'react';
import img1 from '../images/dubai.jpg';
import img2 from '../images/paris.jpg';
import img3 from '../images/singapore.jpg';
import { FiStar } from 'react-icons/fi';


const dummyHotels = [
{ id: 1, name: "The Fullerton Hotel Singapore", rating: 5.0, price: 2024, image: img1, location: "1 Fullerton Square", reviews: 1200 },
{ id: 2, name: "Rosewood Mayakoba", rating: 4.5, price: 1850, image: img2, location: "Riviera Maya", reviews: 1200 },
{ id: 3, name: "Hotel Emma", rating: 4.5, price: 1500, image: img3, location: "San Antonio", reviews: 1200 },
{ id: 4, name: "Grand Palace Hotel", rating: 3.5, price: 990, image: img1, location: "Bangkok", reviews: 800 },
{ id: 5, name: "Cozy Urban Retreat", rating: 2.5, price: 600, image: img2, location: "Berlin", reviews: 350 },
];

const priceRanges = [
{ label: "$ 0 - $ 200", min: 0, max: 200 },
{ label: "$ 200 - $ 500", min: 200, max: 500 },
{ label: "$ 500 - $ 1000", min: 500, max: 1000 },
{ label: "$ 1000 - $ 2000", min: 1000, max: 2000 },
{ label: "$ 2000 - $ 5000", min: 2000, max: 5000 },
];

const Explore = () => {
const [search, setSearch] = useState('');
const [activePrices, setActivePrices] = useState([]);
const [activeRatings, setActiveRatings] = useState([]);

const handleSearch = (e) => setSearch(e.target.value);

const togglePrice = (range) => {
    setActivePrices((prev) =>
    prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
};

const toggleRating = (rating) => {
    setActiveRatings((prev) =>
    prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
};

const applyFilters = () => {
    return dummyHotels.filter((hotel) => {
    const matchSearch = hotel.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = activePrices.length === 0 || activePrices.some((range) => hotel.price >= range.min && hotel.price <= range.max);
    const matchRating = activeRatings.length === 0 || activeRatings.includes(Math.floor(hotel.rating));
    return matchSearch && matchPrice && matchRating;
    });
};

const filteredHotels = applyFilters();

return (
    <div className="bg-[#0f172a] min-h-screen text-white px-4 py-8 md:px-8">
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto space-y-6 md:space-y-0 md:space-x-6">
        <aside className="w-full md:w-1/4 bg-[#1e293b] rounded-xl p-4 shadow-md">
        <h3 className="font-bold text-xl mb-4">Search & Filters</h3>

        <div className="mb-6">
            <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder=" eg. The Fullerton Hotel"
            className="w-full px-4 py-2 text-white border border-yellow-400 bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
            />
        </div>

        <div className="mb-6">
            <h4 className="font-semibold mb-2">Price Range</h4>
            {priceRanges.map((range, index) => (
            <label key={index} className="block text-sm mb-1 cursor-pointer">
                <input
                type="checkbox"
                className="mr-2"
                checked={activePrices.includes(range)}
                onChange={() => togglePrice(range)}
                />
                {range.label}
            </label>
            ))}
        </div>

        <div>
            <h4 className="font-semibold mb-2">Star Rating</h4>
            {[5, 4, 3, 2].map((star) => (
                <label key={star} className="block text-sm mb-1 cursor-pointer">
                    <input
                    type="checkbox"
                    className="mr-2"
                    checked={activeRatings.includes(star)}
                    onChange={() => toggleRating(star)}
                    />
                    <div className="inline-flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className={i < star ? "text-yellow-400" : "text-white"} />
                    ))}
                    </div>
                </label>
            ))}
        </div>
        </aside>

        <main className="w-full md:w-3/4">
        <h2 className="text-2xl font-bold mb-4">
            Singapore: {filteredHotels.length} results found
        </h2>

        {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
            <div key={hotel.id} className="flex flex-col sm:flex-row border rounded-xl mb-6 overflow-hidden shadow bg-[#1e293b]">
                <img src={hotel.image} alt={hotel.name} className="w-full sm:w-48 h-48 object-cover" />
                <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{hotel.name}</h3>
                    <span className="text-yellow-400 font-bold">★ {hotel.rating}</span>
                </div>
                <p className="text-sm text-gray-300">{hotel.reviews} Reviews</p>
                <p className="text-sm text-gray-400 mt-1">{hotel.location}</p>
                <p className="text-sm text-gray-200 mt-2">Descriptive details about the hotel may include the amenities.</p>
                <div className="flex justify-between items-center mt-4">
                    <button className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300">
                    Select
                    </button>
                    <div className="text-right">
                    <p className="text-lg font-bold text-yellow-300">${hotel.price}</p>
                    <p className="text-xs text-gray-300">1 room 1 night<br />Taxes incl.</p>
                    </div>
                </div>
                </div>
            </div>
            ))
        ) : (
            <p className="text-gray-400">No hotels match your search/filter.</p>
        )}
        </main>
    </div>
    </div>
);
};

export default Explore;
