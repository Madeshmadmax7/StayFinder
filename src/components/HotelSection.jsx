import React from 'react';
import HotelCard from './HotelCard';
import img1 from '../images/dubai.jpg';
import img2 from '../images/paris.jpg';
import img3 from '../images/singapore.jpg';

const Hotels = [
  { name: "Hotel Alpha", price: 2024, location: "123 Street, City", image: img1 },
  { name: "Hotel Bravo", price: 2024, location: "123 Street, City", image: img2 },
  { name: "Hotel Charlie", price: 2024, location: "123 Street, City", image: img3 },
  { name: "Hotel Delta", price: 2024, location: "123 Street, City", image: img1 },
  { name: "Hotel Echo", price: 2024, location: "123 Street, City", image: img2 },
];

const HotelSection = () => {
  return (
    <div className="bg-[#0f172a] text-white px-6 py-12">
      <section className="mb-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Top Rated</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {Hotels.map((hotel, idx) => (
            <div className="flex-shrink-0 w-[240px] sm:w-auto" key={idx}>
              <HotelCard {...hotel} />
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Category</h2>
        <div className="w-16 h-1 bg-yellow-400 mb-6"></div>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:space-x-0 sm:gap-6">
          {Hotels.map((hotel, idx) => (
            <div className="flex-shrink-0 w-[240px] sm:w-auto" key={idx + 100}>
              <HotelCard {...hotel} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HotelSection;
