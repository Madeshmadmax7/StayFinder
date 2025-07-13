import React, { createContext, useContext, useEffect, useState } from "react";

const HotelContext = createContext();

export const useHotels = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://stayfinder-backend-v1.onrender.com/api/hotels")
        .then(res => res.json())
        .then(data => {
            setHotels(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Failed to fetch hotels:", err);
            setError(true);
            setLoading(false);
        });
    }, []);

    return (
        <HotelContext.Provider value={{ hotels, loading, error }}>
        {children}
        </HotelContext.Provider>
    );
};