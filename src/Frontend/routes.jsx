// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Login from "./pages/Login/Login.jsx";
import SignupCompany from "./pages/Signup/SignupCompany.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { AddOffers } from "./pages/Offers/AddOffers.jsx";
import { OffersDetails } from "./pages/Offers/OffersDetails.jsx";

import Destinations from "./pages/Feeatures/Destinations.jsx";
import Packages from "./pages/Feeatures/Packages.jsx";
import Experiences from "./pages/Feeatures/Experiences.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupCompany" element={<SignupCompany />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="packages" element={<Packages />} />
        <Route path="experiences" element={<Experiences />} />
        <Route path="/addoffer" element={<AddOffers/>} />
        <Route path="/offerdetails/:id" element={<OffersDetails/>}/>
      </Route>
    ),
    {
      future: {
          v7_startTransition: true,
      },
    }  
);