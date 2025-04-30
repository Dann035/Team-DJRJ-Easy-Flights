import React, { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { OffersCard } from "./OffersCard";
import { Link, useNavigate } from "react-router-dom";
import "./Offers.css"

const url = import.meta.env.VITE_BACKEND_URL


export const Offers = () =>{

    const {store,dispatch} = useGlobalReducer()
    const navigate = useNavigate()

	const moveToAddOffer = () =>{
        navigate("/addoffer")
    }

    useEffect(()=>{
        fetch(`${url}/api/offers`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }, 
        })
        .then((resp)=>resp.json())
        .then(data => {
            dispatch({type:"get_offers", payload:data.offers})
        })
    },[])


    return (
            
        <div className="container-fluid box-offers">
            <h1 className="text-center">Ofertas de viajes</h1>
            <div>
				<button className="botonAdd" onClick={moveToAddOffer}>New Offer</button>
			</div>
            <div className="row mt-5">
                {store.offers?.length === 0 ? (
                    <p ><strong className="text-info">Aún no hay ofertas</strong></p>
                ) : (store.offers?.map((offert, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                        <OffersCard offert={offert} />
                    </div>
                )))}
            </div>
        </div>
    );
}

