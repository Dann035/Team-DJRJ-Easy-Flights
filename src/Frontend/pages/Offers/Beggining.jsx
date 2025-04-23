import React, { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { OffersCard } from "./OffersCard";
import { Link, useNavigate } from "react-router-dom";


export const Begginning = () =>{

    const {store,dispatch} = useGlobalReducer()
    const navigate = useNavigate()

	const moveToAddOffer = () =>{
        navigate("/addoffer")
    }

    useEffect(()=>{
        fetch("https://turbo-space-invention-g47jx555vvx9c95jv-3001.app.github.dev/api/offers",{
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
        <div className="container-fluid">
            <div>
				<button className="botonAdd" onClick={moveToAddOffer}>New Offer</button>
			</div>
            <h1 className="text-center">Ofertas de viajes</h1>
            <div className="row">
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

