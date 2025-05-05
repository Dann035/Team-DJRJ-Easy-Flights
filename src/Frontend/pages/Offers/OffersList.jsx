import React, { useEffect, useState } from "react";
import { OffersListCards } from "./OffersListCards";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { MapPin,Calendar } from "lucide-react";


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
           
             <div  id="contenedor">
            <div className="row ">
                <div className="col-md-3 " >
                {resultado.map((offert,index)=>(
                  <div key={index}>
                      <div className="card">
                        <div className="card-image">
                            <img src={offert.image_url} alt="1" className="w-100 h-100 object-cover rounded-top img-fluid"/>
                        </div>
                        <div className="category"> 
                            <h3>{offert.title}</h3>
                        </div>
                        <div className="heading"> 
                            <div className="flex items-start mb-2">
                                <MapPin/><span>{offert.location}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Calendar className="w-4 h-4 mr-1" /><span>{offert.duration}</span><br/>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
              </div> 
           
          <table className="table table-striped table-hover mt-5 shadow-lg">
              <thead>
                  <tr className="bg-curso text-white">
                    <th>TITULO</th>
                    <th>LUGAR</th>

                  </tr>

              </thead>

              <tbody>
                {resultado.map((offer,index)=>(
                  <tr key={index}>
                    <td>{offer.title}</td>
                    <td>{offer.location}</td>
                  </tr>
                ))}

              </tbody>

           </table>


        </div>
    )
}