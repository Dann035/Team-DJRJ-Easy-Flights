import React, { useEffect } from "react";
import Login from "./Login/Login.jsx";
import Tagline from "../components/Tagline/Tagline.jsx";
import TravelShow from "../components/TravelShowCase/TravelShow.jsx";
import Comments from "../components/Comments/Comments.jsx";
import Features from "../components/Features/Features.jsx";
import { Offers } from "./Offers/Offers.jsx";
import { motion } from "framer-motion";
import OffersAPI from "./Offers/OffersAPI/OffersAPI.jsx";
import { AuthProvider } from "../hooks/useAuthContext.jsx";

// Increased particle count for better distribution across the entire page
const numberOfParticles = 60;

// Function to generate particles with more uniform distribution
const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => (
        <div 
            key={i} 
            className="particle"
            style={{
                // More uniform distribution across the page
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                // Varied sizes for enhanced visual effect
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                // Varied opacity for depth effect
                opacity: `${0.2 + Math.random() * 0.5}`,
                // Varied animation timing for more natural movement
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 15}s`
            }}
        />
    ));
};

const particles = generateParticles(numberOfParticles);

export const Home = () => {
    return (
        <div className="home-container">
            <div className="particles-container">
                {particles}
            </div>
            <Tagline />
            <OffersAPI />
            <Offers/>
            <TravelShow />
            <Comments />
            <Features />
        </div>
    );
};
