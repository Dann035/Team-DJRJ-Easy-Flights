import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";


export const OffersDetails = () =>{

    const {id} = useParams();
    const {store,dispatch} = useGlobalReducer()


    useEffect(() => {
        

        fetch(`https://turbo-space-invention-g47jx555vvx9c95jv-3001.app.github.dev/api/offers/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((resp) => resp.json())
        .then(data => {
            dispatch({type: "get_offers", payload: data.offers.id})
        })
    }
    , [id,dispatch]) 


    return (
        <div>
            <h1 className="text-center">Detalles de la oferta</h1>
            {store.offers && (
                <div className="card p-5" id="cardaddoffer">
                    <h2 className="text-danger">{store.offers.title}</h2>
                    <p>{store.offers.description}</p>
                    <p>Precio: {store.offers.price}</p>
                    <p>Tipo de oferta: {store.offers.type_offert}</p>
                    <img src={store.offers.image_url} alt="Imagen de la oferta" />
                </div>
            )}
            
        </div>
    )
}