import { createContext, useContext, useEffect, useState } from 'react';

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
const [hotels, setHotels] = useState(() => {
    const cached = localStorage.getItem("hotels");
    return cached ? JSON.parse(cached) : [];
});

const [loading, setLoading] = useState(hotels.length === 0);
const [error, setError] = useState(false);

useEffect(() => {
    if (hotels.length === 0) {
    fetch("https://stayfinder-backend-v1.onrender.com/api/hotels")
        .then((res) => res.json())
        .then((data) => {
        setHotels(data);
        localStorage.setItem("hotels", JSON.stringify(data)); // 🔐 cache in localStorage
        setLoading(false);
        })
        .catch((err) => {
        console.error("Error fetching hotels:", err);
        setError(true);
        setLoading(false);
        });
    }
}, []);

return (
    <HotelContext.Provider value={{ hotels, loading, error }}>
    {children}
    </HotelContext.Provider>
);
};

export const useHotels = () => useContext(HotelContext);
