import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';

const HotelSection = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://stayfinder-backend-pmed.onrender.com/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const renderHotelList = (limit, startIdx = 0) =>
    hotels.slice(startIdx, startIdx + limit).map((hotel, idx) => (
      <div className="flex-shrink-0 w-[240px] sm:w-auto" key={hotel.id || idx}>
        <HotelCard
          name={hotel.name}
          price={hotel.price}
          location={hotel.city}
          image={hotel.mainImage || '/default.jpg'}
        />
      </div>
    ));

  if (loading) {
    return (
      <div className="bg-[#0f172a] text-white min-h-screen flex justify-center items-center">
        <p className="text-lg animate-pulse">Loading hotels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0f172a] text-red-500 min-h-screen flex justify-center items-center">
        <p className="text-lg">Failed to load hotels. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] text-white px-6 py-12">
      {/* Top Rated Section */}
      <section className="mb-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Top Rated</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {renderHotelList(5)}
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Category</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {renderHotelList(5, 5)}
        </div>
      </section>
    </div>
  );
};

export default HotelSection;
