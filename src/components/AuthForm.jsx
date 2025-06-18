import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "../images/dubai.jpg";

const AuthForm = () => {
const [isSignUp, setIsSignUp] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [username, setUsername] = useState("");
const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    navigate("/");
    }
}, []);

const handleSignUp = async () => {
    try {
    await axios.post("http://localhost:8080/api/users", {
        username,
        email,
        password,
    });

    alert("Sign up successful!");
    setIsSignUp(false);
    setUsername("");
    setEmail("");
    setPassword("");
    } catch (err) {
    console.error(err);
    alert("Sign up failed. Please try again.");
    }
};

const handleSignIn = async () => {
try {
    const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
    });


    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    const pendingBooking = localStorage.getItem("pendingBooking");
    if (pendingBooking) {
    const { hotelId } = JSON.parse(pendingBooking);
    navigate(`/hotel/${hotelId}`);
    } else {
    navigate("/");
    }

} catch (err) {
    console.error(err);
    alert("Invalid email or password.");
}
};


return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4 pt-[88px]">
    <div className="relative w-full max-w-5xl h-auto md:h-[500px] overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row bg-[#1e293b]">
        {/* Image Section */}
        <div
        className={`hidden md:block md:w-1/2 relative overflow-hidden transition-transform duration-700 ${
            isSignUp ? "md:translate-x-full" : "md:translate-x-0"
        }`}
        >
        <img
            src={img1}
            alt="Illustration"
            className="absolute inset-0 object-cover w-full h-full"
        />
        </div>

        {/* Form Section */}
        <div
        className={`w-full md:w-1/2 p-8 md:p-10 transition-transform duration-700 ${
            isSignUp ? "md:-translate-x-full" : "md:translate-x-0"
        }`}
        >

        {!isSignUp ? (
            <>
            <h2 className="text-2xl font-bold mb-2">Sign In</h2>
            <p className="text-gray-300 mb-4">Log in with your credentials or Google.</p>
            <button className="w-full bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded mb-4 transition">
                Sign in with Google
            </button>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#334155] px-4 py-2 mb-3 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#334155] px-4 py-2 mb-4 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <button
                onClick={handleSignIn}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition"
            >
                Sign In
            </button>
            <p className="mt-4 text-sm text-gray-300 text-center">
                Don’t have an account?{" "}
                <button
                onClick={() => setIsSignUp(true)}
                className="text-yellow-400 hover:underline"
                >
                Sign Up
                </button>
            </p>
            </>
        ) : (
            <>
            <h2 className="text-2xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-300 mb-4">Start your journey today!</p>
            <button className="w-full bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded mb-4 transition">
                Sign up with Google
            </button>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                className="w-full bg-[#334155] px-4 py-2 mb-3 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#334155] px-4 py-2 mb-3 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-[#334155] px-4 py-2 mb-4 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <button
                onClick={handleSignUp}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 rounded transition"
            >
                Sign Up
            </button>
            <p className="mt-4 text-sm text-gray-300 text-center">
                Already have an account?{" "}
                <button
                onClick={() => setIsSignUp(false)}
                className="text-yellow-400 hover:underline"
                >
                Sign In
                </button>
            </p>
            </>
        )}
        </div>
    </div>
    </div>
);
};

export default AuthForm;
