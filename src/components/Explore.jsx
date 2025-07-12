import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img1 from '../images/dubai.jpg';
import { FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const priceRanges = [
  { label: "₹ 0 - ₹ 2000", min: 0, max: 2000 },
  { label: "₹ 2000 - ₹ 5000", min: 2000, max: 5000 },
  { label: "₹ 5000 - ₹ 10000", min: 5000, max: 10000 },
];

const Explore = () => {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [activePrices, setActivePrices] = useState([]);
  const [activeRatings, setActiveRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://stayfinder-backend-v1.onrender.com/api/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error('Error fetching hotels:', err));
  }, []);

  const togglePrice = (range) => {
    setActivePrices(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleRating = (rating) => {
    setActiveRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchSearch = hotel.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice =
      activePrices.length === 0 ||
      activePrices.some(range => hotel.price >= range.min && hotel.price <= range.max);
    const matchRating =
      activeRatings.length === 0 || activeRatings.includes(Math.floor(hotel.rating));
    return matchSearch && matchPrice && matchRating;
  });

  return (
    <div className="bg-[#0f172a] min-h-screen text-white px-4 py-8 md:px-8">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto space-y-6 md:space-y-0 md:space-x-6">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 bg-[#1e293b] rounded-xl p-4 shadow-md">
          <h3 className="font-bold text-xl mb-4">Search & Filters</h3>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hotel..."
            className="w-full px-4 py-2 text-white border border-yellow-400 bg-transparent rounded mb-6"
          />

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

          <h4 className="font-semibold mt-6 mb-2">Star Rating</h4>
          {[5, 4, 3, 2].map((star) => (
            <label key={star} className="block text-sm mb-1 cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={activeRatings.includes(star)}
                onChange={() => toggleRating(star)}
              />
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={i < star ? 'text-yellow-400 inline' : 'text-gray-600 inline'}
                />
              ))}
            </label>
          ))}
        </aside>

        {/* Hotel Cards */}
        <main className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold mb-4">
            Explore: {filteredHotels.length} result(s) found
          </h2>

          {filteredHotels.map(hotel => (
            <div
              key={hotel.id}
              className="flex flex-col sm:flex-row border rounded-xl mb-6 overflow-hidden shadow bg-[#1e293b]"
            >
              <img
                src={hotel.mainImage || img1}
                alt={hotel.name}
                className="w-full sm:w-48 h-48 object-cover"
              />
              <div className="flex-1 p-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <span className="text-yellow-400 font-bold">★ {hotel.rating}</span>
                </div>
                <p className="text-sm text-gray-300">{hotel.city}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {hotel.description?.slice(0, 80)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300"
                  >
                    Select
                  </button>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-300">₹{hotel.price}</p>
                    <p className="text-xs text-gray-300">1 room / night</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Explore;
