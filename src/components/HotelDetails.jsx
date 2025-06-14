import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiWifi, FiCoffee, FiHome, FiBox, FiMapPin } from "react-icons/fi";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import img1 from '../images/dubai.jpg'

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../customCalendar.css";

const hotels = {
1: {
    name: "Ocean View Suite",
    city: "Chennai",
    guests: 4,
    beds: 2,
    bathrooms: 1,
    price: 1800,
    image: img1,
    amenities: [
    { icon: <FiWifi />, name: "WiFi" },
    { icon: <FiBox />, name: "Free parking" },
    { icon: <FiHome />, name: "Lift" },
    { icon: <FiCoffee />, name: "Kitchen" },
    ],
},
};

const HotelDetails = () => {
const { id } = useParams();
const hotel = hotels[id] || hotels[1];

const [dateRange, setDateRange] = useState([
    {
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
    },
]);

const [guests, setGuests] = useState(1);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);

return (
    <div className="bg-[#0f172a] text-white min-h-screen pb-20">
    {/* Hero Section */}
    <header
        className="relative bg-cover bg-center h-[90vh]"
        style={{ backgroundImage: `url(${hotel.image})` }}
    >
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{hotel.name}</h1>
        <div className="text-lg md:text-xl text-gray-200 flex items-center gap-2">
            <FiMapPin />
            <span>{hotel.city}</span>
        </div>
        </div>

    </header>

    <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col lg:flex-row-reverse gap-10">
        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-[#111d38] border border-blue-400 rounded-xl p-6 shadow-xl sticky top-24 h-fit">
        <h3 className="text-xl font-bold text-white">
            ₹{hotel.price} <span className="text-sm text-blue-600">/night</span>
        </h3>
        <div className="mt-4 space-y-3">
            <div className="flex justify-between gap-2">
            <div>
                <p className="text-sm font-medium text-white">Check-in</p>
                <input
                type="date"
                className="border rounded px-2 py-1 w-full text-white bg-[#0f172a]"
                value={dateRange[0].startDate.toISOString().split("T")[0]}
                readOnly
                />
            </div>
            <div>
                <p className="text-sm font-medium text-white">Checkout</p>
                <input
                type="date"
                className="border rounded px-2 py-1 w-full text-white bg-[#0f172a]"
                value={dateRange[0].endDate.toISOString().split("T")[0]}
                readOnly
                />
            </div>
            </div>

            <div>
            <p className="text-sm font-medium text-white">Guests</p>
            <select
                className="border rounded px-2 py-1 w-full text-white bg-[#111d38]"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
            >
                {[1, 2, 3, 4].map((g) => (
                <option key={g} value={g}>
                    {g} guest{g > 1 ? "s" : ""}
                </option>
                ))}
            </select>
            </div>

            <button className="bg-blue-700 hover:bg-blue-900 text-white w-full py-2 rounded-md font-semibold">
            Reserve
            </button>
            <p className="text-xs text-center text-blue-600">
            You won't be charged yet
            </p>
        </div>
        </div>

        {/* Main Section */}
        <div className="flex-1">
        {/* Amenities */}
        <h2 className="text-2xl font-bold mb-4">What this place offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-9 mb-12">
            {hotel.amenities.map((a, i) => (
            <div
                key={i}
                className="flex items-center gap-3 bg-blue-800 p-3 rounded-md shadow-md"
            >
                {a.icon}
                <span>{a.name}</span>
            </div>
            ))}
        </div>

        {/* Date Range Picker */}
        <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">Choose Your Dates</h2>
            <div className="rounded-xl overflow-auto shadow-xl w-full">
            <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                months={isMobile ? 1 : 2}
                direction={isMobile ? "vertical" : "horizontal"}
                className="custom-calendar-ui"
            />
            </div>
            <div className="text-right mt-2">
            <button
                className="text-sm hover:text-blue-300 bg-[#141f4b] rounded-3xl p-2"
                onClick={() =>
                setDateRange([
                    {
                    startDate: new Date(),
                    endDate: addDays(new Date(), 1),
                    key: "selection",
                    },
                ])
                }
            >
                Clear dates
            </button>
            </div>
        </div>

        {/* Map */}
        <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">Location</h2>
            <iframe
            title="Map"
            className="w-full h-64 rounded-md border border-blue-400"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
                hotel.city
            )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
            allowFullScreen
            ></iframe>
        </div>

        {/* More Images */}
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">More Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <img
                className="rounded-md h-40 w-full object-cover"
                src={img1}
                alt="Hotel"
            />
            <img
                className="rounded-md h-40 w-full object-cover"
                src={img1}
                alt="Room"
            />
            <img
                className="rounded-md h-40 w-full object-cover"
                src={img1}
                alt="Resort"
            />
            </div>
        </div>
        </div>
    </div>
    </div>
);
};

export default HotelDetails;
