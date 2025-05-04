import React, { useEffect } from "react";
import { OffersListCards } from "./OffersListCards";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { OffersFilter } from "../../components/OffersFilter/OffersFilter";
const url = import.meta.env.VITE_BACKEND_URL
export const OffersList = () => {

    const {store,dispatch} = useGlobalReducer()
    
    
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

    return(
        
        <div>
            <div className="container-fluid ">
                <OffersFilter/>
                        <h1 className="text-center">Ofertas</h1>
                        <div className="row mt-5">
                            {store.offers?.length === 0 ? (
                                <p ><strong className="text-info">Aún no hay ofertas</strong></p>
                            ) : (store.offers?.map((offert, index) => (
                                <div className="col-md-3 mb-3" key={index}>
                                    <OffersListCards offert={offert} />
                                </div>
                            )))}
                        </div>
            </div>
        </div>
    )
}