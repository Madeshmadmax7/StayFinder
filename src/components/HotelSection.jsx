import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';

const HotelSection = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error("Error fetching hotels:", err));
  }, []);

  return (
    <div className="bg-[#0f172a] text-white px-6 py-12">
      <section className="mb-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Top Rated</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {hotels.map((hotel, idx) => (
            <div className="flex-shrink-0 w-[240px] sm:w-auto" key={idx}>
              <HotelCard
                name={hotel.name}
                price={hotel.price}
                location={hotel.city}
                image={hotel.mainImage || '/default.jpg'}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Category</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {hotels.map((hotel, idx) => (
            <div className="flex-shrink-0 w-[240px] sm:w-auto" key={idx + 100}>
              <HotelCard
                name={hotel.name}
                price={hotel.price}
                location={hotel.city}
                image={hotel.mainImage || '/default.jpg'}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HotelSection;
