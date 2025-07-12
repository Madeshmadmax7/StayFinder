// src/pages/BookedHotels.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookedHotels = () => {
const navigate = useNavigate();
const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);
const userId = JSON.parse(localStorage.getItem("user"))?.id;

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!userId || !token) return;

    axios
    .get(`https://stayfinder-backend-v1.onrender.com/api/bookings?userId=${userId}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        setBookings(response.data);
        setLoading(false);
    })
    .catch((error) => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
    });
}, [userId]);

if (loading) {
    return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading bookings...</p>
    </div>
    );
}

if (bookings.length === 0) {
    return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">No previous bookings</h1>
        <p className="text-gray-400 mb-6">
        Looks like you haven’t booked any hotels yet.
        </p>
        <button
        onClick={() => navigate('/explore')}
        className="bg-white text-[#0f172a] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
        Get Started
        </button>
    </div>
    );
}

return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
    <h1 className="text-3xl font-bold mb-6">Your Booked Hotels</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking, index) => (
        <div
            key={index}
            className="bg-[#1e293b] p-5 rounded-lg shadow hover:shadow-lg transition"
        >
            <h2 className="text-xl font-semibold">{booking.hotel?.name}</h2>
            <p className="text-gray-300">{booking.hotel?.city}</p>
            <p className="mt-2 text-sm text-gray-400">
            From: {new Date(booking.checkInDate).toLocaleDateString()} <br />
            To: {new Date(booking.checkOutDate).toLocaleDateString()}
            </p>
        </div>
        ))}
    </div>
    </div>
);
};

export default BookedHotels;
