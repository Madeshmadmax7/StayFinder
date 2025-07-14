import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
const [hotels, setHotels] = useState([]);
const [loading, setLoading] = useState(true);

const fetchHotels = async () => {
    try {
    const res = await axios.get("https://stayfinder-backend-v1.onrender.com/api/hotels");
    setHotels(res.data);
    } catch (err) {
    console.error("Failed to fetch hotels", err);
    } finally {
    setLoading(false);
    }
};

useEffect(() => {
    fetchHotels();
}, []);

return (
    <HotelContext.Provider value={{ hotels, loading }}>
    {children}
    </HotelContext.Provider>
);
};
