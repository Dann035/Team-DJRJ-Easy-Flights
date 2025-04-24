import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";


export const OffersDetails = () =>{

    const {id} = useParams();
    const [offer,setOffer] = useState({})
    

    
    useEffect(() => {
        
        fetch(`https://turbo-space-invention-g47jx555vvx9c95jv-3001.app.github.dev/api/offers/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((resp) => resp.json())
        .then(data => {setOffer(data.offer)})
        .catch(error=>{
            console.error("Ha salido un error", error )
        
        })
    }
    , [id]) 


    return (
        <div className="container-fluid">
            <div className="card p-5" id="cardaddoffer">
                <h1>Detalles de la oferta</h1>
                {offer ? (
                    <>
                        <h2>{offer.title}</h2>
                        
                        
                    </>
                ) : (
                    <p>Cargando detalles de la oferta...</p>
                )}
            </div>
        </div>
    );
}