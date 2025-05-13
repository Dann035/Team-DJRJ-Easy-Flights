import React, { useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../hooks/useAuthContext";
import { OffersCard } from "./OffersCard";
import {OfCard2} from "./OfCard2/OfCard2";
import { Link, useNavigate } from "react-router-dom";
import "./Offers.css";

const url = import.meta.env.VITE_BACKEND_URL;

export const Offers = () => {
    const { texts } = useLanguage();
    const { user } = useAuth();
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [displayCount, setDisplayCount] = useState(4); // Estado para controlar cuántas ofertas mostrar

    const isCompany = user && Array.isArray(user.roles) && user.roles.includes("COMPANY");

    const moveToAddOffer = () => {
        navigate("/addoffer");
    };

    // Función para mostrar todas las ofertas
    const showAllOffers = () => {
        navigate("/offerslist");
    };

    useEffect(() => {
        fetch(`${url}/api/offers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                dispatch({ type: "get_offers", payload: data.offers });
            });
    }, []);

    // Limitamos las ofertas a mostrar a solo 4
    const limitedOffers = store.offers?.slice(0, displayCount);

    return (
        <div className="container-fluid box-offers">
            <h1 className="title-offers text-center">{texts.travelOffers}</h1>

            <div className="d-flex justify-content-between">
                <div>
                    <button
                        className={`botonAdd ${!isCompany ? "d-none" : ""}`}
                        onClick={moveToAddOffer}
                    >
                        {texts.createOffer}
                    </button>
                </div>
            </div>
            
            <div className="row mt-5 of-listcard">
                {!store.offers || store.offers.length === 0 ? (
                    <p><strong className="text-info">{texts.noOffers}</strong></p>
                ) : (
                    <>
                        {limitedOffers.map((offert, index) => (
                            <div className="col-md-3 mb-3" key={index}>
                                <OfCard2 offert={offert} />
                            </div>
                        ))}
                        
                        {store.offers.length > displayCount && (
                            <div className="col-12 text-center mt-4">
                                <button 
                                    className="botonAdd" 
                                    onClick={showAllOffers}
                                >
                                    {texts.viewMoreOffers}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
