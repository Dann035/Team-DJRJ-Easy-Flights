import React, { useEffect } from "react";
import Login from "./Login/Login.jsx";
import Tagline from "../components/Tagline/Tagline.jsx";
import Offerts from "./Offerts/Offerts.jsx";
import TravelShow from "../components/TravelShowCase/TravelShow.jsx";
import Comments from "../components/Comments/Comments.jsx";

export const Home = () => {

    return (
        <>
			<Tagline />
            <TravelShow />
            <Comments />
			<Offerts />
		</>
    );
};
