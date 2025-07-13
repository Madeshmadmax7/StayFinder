import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiWifi, FiCoffee, FiHome, FiBox, FiMapPin } from "react-icons/fi";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../customCalendar.css";
import "./Navbar"

const ICONS = {
    "WiFi": <FiWifi />,
    "Free parking": <FiBox />,
    "Lift": <FiHome />,
    "Kitchen": <FiCoffee />
};

const HotelDetails = () => {
const { id } = useParams();
const navigate = useNavigate();
const [hotel, setHotel] = useState(null);
const [loading, setLoading] = useState(true);
const [dateRange, setDateRange] = useState([
    {
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
    },
]);
const [guests, setGuests] = useState(1);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// Handle screen resize
useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}, []);

// Fetch hotel data
useEffect(() => {
    const fetchHotel = async () => {
    try {
        const response = await axios.get(`https://stayfinder-backend-v1.onrender.com/api/hotels/${id}`);
        setHotel(response.data);
    } catch (err) {
        console.error("Error loading hotel:", err);
        setHotel(null);
    } finally {
        setLoading(false);
    }
    };

    fetchHotel();
}, [id]);

// Pending booking restore
useEffect(() => {
    const pending = localStorage.getItem("pendingBooking");
    if (pending && hotel) {
    const { hotelId, checkInDate, checkOutDate, guests: savedGuests } = JSON.parse(pending);
    if (hotelId === id) {
        setDateRange([
        {
            startDate: new Date(checkInDate),
            endDate: new Date(checkOutDate),
            key: "selection",
        },
        ]);
        setGuests(savedGuests);
        proceedToBooking();
        localStorage.removeItem("pendingBooking");
    }
    }
}, [hotel]);

const proceedToBooking = async () => {
    try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const bookingData = {
        checkInDate: dateRange[0].startDate.toISOString().split("T")[0],
        checkOutDate: dateRange[0].endDate.toISOString().split("T")[0],
        guests: parseInt(guests),
        totalPrice:
        hotel.price *
        ((new Date(dateRange[0].endDate) - new Date(dateRange[0].startDate)) / (1000 * 60 * 60 * 24)),
    };

    await axios.post(
        `https://stayfinder-backend-v1.onrender.com/api/bookings/create?userId=${user.id}&hotelId=${id}`,
        bookingData,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

    navigate("/booking");
    } catch (error) {
    console.error("Booking failed:", error);
    alert("Booking failed. Please try again.");
    }
};

const handleReserve = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
    const pendingBooking = {
        hotelId: id,
        checkInDate: dateRange[0].startDate.toISOString(),
        checkOutDate: dateRange[0].endDate.toISOString(),
        guests,
    };
    localStorage.setItem("pendingBooking", JSON.stringify(pendingBooking));
    navigate("/login");
    return;
    }

    await proceedToBooking();
};

if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
}

if (!hotel) {
    return <div className="text-red-500 text-center py-10">Hotel not found.</div>;
}

return (
    <>
        <Navbar/>
        <div className="bg-[#0f172a] text-white min-h-screen pb-20">
        {/* Hero */}
        <header className="relative bg-cover bg-center h-[90vh]" style={{ backgroundImage: `url(${hotel.mainImage})` }}>
            <div className="absolute inset-0 bg-opacity-40"></div>
            <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{hotel.name}</h1>
            <div className="text-lg md:text-xl text-gray-200 flex items-center gap-2">
                <FiMapPin />
                <span>{hotel.city}</span>
            </div>
            </div>
        </header>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col lg:flex-row-reverse gap-10">
            {/* Sidebar */}
            <div className="w-full lg:w-96 bg-[#111d38] border border-blue-400 rounded-xl p-6 shadow-xl lg:sticky lg:top-24 h-fit">
            <h3 className="text-xl font-bold text-white">
                ₹{hotel.price} <span className="text-sm text-blue-600">/night</span>
            </h3>

            <div className="mt-4 space-y-3">
                {/* Dates + Guests */}
                <div className="flex justify-between gap-2">
                <div>
                    <p className="text-sm font-medium text-white">Check-in</p>
                    <input type="date" className="border rounded px-2 py-1 w-full text-white bg-[#0f172a]"
                    value={dateRange[0].startDate.toISOString().split("T")[0]} readOnly />
                </div>
                <div>
                    <p className="text-sm font-medium text-white">Checkout</p>
                    <input type="date" className="border rounded px-2 py-1 w-full text-white bg-[#0f172a]"
                    value={dateRange[0].endDate.toISOString().split("T")[0]} readOnly />
                </div>
                </div>

                <div>
                <p className="text-sm font-medium text-white">Guests</p>
                <select className="border rounded px-2 py-1 w-full text-white bg-[#111d38]"
                    value={guests} onChange={(e) => setGuests(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6].map(g => (
                    <option key={g} value={g}>{g} guest{g > 1 ? "s" : ""}</option>
                    ))}
                </select>
                </div>

                <button onClick={handleReserve} className="bg-blue-700 hover:bg-blue-900 text-white w-full py-2 rounded-md font-semibold">
                Reserve
                </button>
                <p className="text-xs text-center text-blue-600">You won't be charged yet</p>
            </div>
            </div>

            {/* Main Section */}
            <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4 mt-9 mb-12">
                {hotel.amenities?.map((name, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-2 bg-[#1e2b4b] p-4 rounded-lg shadow text-sm text-center">
                    <div className="text-xl text-blue-400">{ICONS[name] || <FiBox />}</div>
                    <span className="text-white">{name}</span>
                </div>
                ))}
            </div>

            <h2 className="text-xl font-bold mb-4">About this place</h2>
            <p className="mb-10 text-gray-300">{hotel.description}</p>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4">Details</h2>
                <ul className="space-y-1 text-gray-300">
                <li>Guests: {hotel.guests}</li>
                <li>Beds: {hotel.beds}</li>
                <li>Bathrooms: {hotel.bathrooms}</li>
                <li>Address: {hotel.address}</li>
                {hotel.rating && <li>Rating: ⭐ {hotel.rating}/5</li>}
                </ul>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4">Choose Your Dates</h2>
                <div className="rounded-xl overflow-auto shadow-xl w-full flex justify-center">
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
                    onClick={() => setDateRange([{ startDate: new Date(), endDate: addDays(new Date(), 1), key: "selection" }])}
                >
                    Clear dates
                </button>
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-xl font-bold mb-4">Location</h2>
                <iframe
                title="Map"
                className="w-full h-64 rounded-md border border-blue-400"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(hotel.city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                loading="lazy"
                allowFullScreen
                />
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">More Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.subImages?.map((img, i) => (
                    <img key={i} className="rounded-md h-40 w-full object-cover" src={img} alt={`hotel-img-${i}`} />
                ))}
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
);
};

export default HotelDetails;
