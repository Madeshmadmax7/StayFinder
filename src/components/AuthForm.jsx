import React, { useState } from "react";
import img1 from "../images/dubai.jpg";

const AuthForm = () => {
const [isSignUp, setIsSignUp] = useState(false);

return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4 pt-[88px]">
    <div className="relative w-full max-w-5xl h-auto md:h-[500px] overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row bg-[#1e293b]">
        
        {/* Image Section - desktop only */}
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

        {/* Form Section - always full width on mobile, slides on desktop only */}
        <div
        className={`w-full md:w-1/2 p-8 md:p-10 transition-transform duration-700 ${
            isSignUp ? "md:-translate-x-full" : "md:translate-x-0"
        }`}
        >
        {!isSignUp ? (
            <>
            <h2 className="text-2xl font-bold mb-2">Sign In</h2>
            <p className="text-gray-300 mb-4">
                Log in with your credentials or Google.
            </p>
            <button className="w-full bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded mb-4 transition">
                Sign in with Google
            </button>
            <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#334155] px-4 py-2 mb-3 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#334155] px-4 py-2 mb-4 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition">
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
                placeholder="Name"
                className="w-full bg-[#334155] px-4 py-2 mb-3 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#334155] px-4 py-2 mb-3 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#334155] px-4 py-2 mb-4 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />
            <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 rounded transition">
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
