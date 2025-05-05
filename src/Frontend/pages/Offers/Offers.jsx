import React, { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useAuth } from "../../hooks/useAuthContext";
import { OffersCard } from "./OffersCard";
import { Link, useNavigate } from "react-router-dom";
import "./Offers.css";

const url = import.meta.env.VITE_BACKEND_URL;

export const Offers = () => {
    const { user } = useAuth();
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const isCompany = user && Array.isArray(user.roles) && user.roles.includes("COMPANY");

    const moveToAddOffer = () => {
        navigate("/addoffer");
    };

    const moveToOffersList = () => {
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

    return (
        <div className="container-fluid box-offers">
            <h1 className="text-center">Ofertas de viajes</h1>

            <div className="d-flex justify-content-between">
                <div>
                    <button
                        className={`botonAdd ${!isCompany ? "d-none" : ""}`}
                        onClick={moveToAddOffer}
                    >
                        Crear Oferta
                    </button>
                </div>

                <div className="justify-content-end">
                    <button className="botonAdd" onClick={moveToOffersList}>
                        Ofertas
                    </button>
                </div>
            </div>
            
            
            

            {/* <div>
				<button className={`botonAdd ${!isCompany ? "d-none" : ""}`} onClick={moveToAddOffer}>New Offer</button>
			</div> */}
            <div className="row mt-5 of-listcard">
                {store.offers?.length === 0 ? (
                    <p ><strong className="text-info">Aún no hay ofertas</strong></p>
                ) : (store.offers?.map((offert, index) => (
                    <div className=" col-md-3 mb-3" key={index}>
                        <OffersCard offert={offert} />
                    </div>
                )))}
            </div>
        </div>
    );
};
