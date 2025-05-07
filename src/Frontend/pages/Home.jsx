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

const particles = Array.from({ length: 20 }).map((_, i) => (
    <div 
        key={i} 
        className="particle"
        style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
        }}
    />
));

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
