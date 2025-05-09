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

import TravelTips from "./pages/TravelTips/TravelTips.jsx";
import Destinations from "./pages/Feeatures/Destinations.jsx";
import Packages from "./pages/Feeatures/Packages.jsx";
import Tools from "./pages/Feeatures/Tools.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import TermsofService from "./pages/Termsofservice/TermsofService.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/PolicyInfo.jsx";
import CookiesPolicy from "./pages/CookiesPolicy/UserConsent.jsx";
import {OffersList } from "./pages/Offers/OffersList.jsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupCompany" element={<SignupCompany />} />
        <Route path="/travel-tips" element={<TravelTips />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="packages" element={<Packages />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/addoffer" element={<AddOffers/>} />
        <Route path="/offerdetails/:id" element={<OffersDetails/>}/>
        <Route path="/offerslist" element={<OffersList/>}/>
        <Route path="/terms-of-service" element={<TermsofService />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>
    ),
    {
      future: {
          v7_startTransition: true,
      },
    }  
);