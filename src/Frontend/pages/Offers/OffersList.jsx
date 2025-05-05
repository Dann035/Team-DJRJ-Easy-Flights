import React, { useEffect, useState } from "react";
import { OffersListCards } from "./OffersListCards";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { MapPin,Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL
export const OffersList = () => {

    const {store,dispatch} = useGlobalReducer()
    const [users,setUsers] = useState([])
    const [search,setSearch] = useState("")

    const link = url + "/api/offers"

    const showData = async () =>{

      try{
        const response = await fetch(link)
        const data = await response.json()
      
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.offers)) {
        setUsers(data.offers);
      } else {
        console.error("La respuesta no es un array válido:", data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
    }

    useEffect(()=>{
      showData()
    },[])
    

    //funcion de busqueda
    const searcher = (e) =>{
      setSearch(e.target.value)
      console.log(e.target)
    }
    

    //metodo de filtrado
    let resultado = []
    if (!search){
      resultado = users
    }
    else{
      resultado = users.filter((titulo)=>titulo.location.toLowerCase().includes(search.toLocaleLowerCase()))
    }


    return(
        
        // <div>
        //     <div className="container-fluid ">
        //         <h2 className="text-center">Busqueda</h2>
        //         <input value={search} onChange={searcher} type="text" placeholder="SEARCH" className="form-control"/>
        //         <h1 className="text-center">Ofertas</h1>
        //           <div className="row mt-5">
        //               {store.offers?.length === 0 ? (
        //                   <p ><strong className="text-info">Aún no hay ofertas</strong></p>
        //               ) : (resultado.map((offert, index) => (
        //                       <div className="col-md-3 mb-3" key={index}>
        //                           <OffersListCards offert={offert} />
        //                       </div>
        //                 )))}
        //           </div>
        //     </div>
        // </div>

        <div className="container-fluid">
          <h2 className="text-center">Busqueda</h2>
          <input value={search} onChange={searcher} type="text" placeholder="SEARCH" className="form-control"/>
          <h1 className="text-center">OFERTAS</h1>

            <div className="row mt-5 of-list">
                
                {resultado.map((offert,index)=>(
                    <div className="col-md-3 mb-5" key={index}>
                          <OffersListCards offert={offert}/>
                    </div>
                ))}

              </div>

        </div>
    )
}