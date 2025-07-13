import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';
import { useHotels } from '../context/HotelContext';

const HotelSection = () => {
  const { hotels, loading, error } = useHotels();
  const [topRated, setTopRated] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (hotels.length) {
      const shuffled = [...hotels].sort(() => 0.5 - Math.random());
      setTopRated(shuffled.slice(0, 5));
      setCategories(shuffled.slice(5, 10));
    }
  }, [hotels]);

  const renderHotelList = (list) =>
    list.map((hotel, idx) => (
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
      <section className="mb-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Top Rated</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {renderHotelList(topRated)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Category</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {renderHotelList(categories)}
        </div>
      </section>
    </div>
  );
};

export default HotelSection;
