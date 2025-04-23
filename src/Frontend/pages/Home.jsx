import React, { useEffect } from "react";
import Login from "./Login/Login.jsx";
import Tagline from "../components/Tagline/Tagline.jsx";
import TravelShow from "../components/TravelShowCase/TravelShow.jsx";
import Comments from "../components/Comments/Comments.jsx";
import Features from "../components/Features/Features.jsx";


export const Home = () => {

    return (
        <>
			<Tagline />
            <TravelShow />
            <Comments />
            <Features />
		</>
    );
};
