import React, { use, useEffect, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";
const URL = import.meta.env.VITE_BACKEND_URL
import "./AddOffers.css"
import { CardPreview } from "./CardPreview/CardPreview";


export const AddOffers = () => {
  const {store,dispatch } = useGlobalReducer();
  const navigate = useNavigate()
  const {user, hasRole} = useAuth()
  const [offer, SetOffer] = useState({
    title: "",
    description: "",
    price: "",
    type_offert: "",
    image_url: "",
    location: "",
    duration: "",
    tags:""
    // imagedetails1: "",
    // imagedetails2: "",
    // imagedetails3: "",
    // imagedetails4: ""
  });

  useEffect(() => {
    if (!hasRole(['COMPANY'])) {
      navigate('/')
    }
  },);

  const saveChange = (e) => {
    SetOffer({
      ...offer,
      [e.target.id]: e.target.value,
    });
  };

  const newOffert = async () => {
    try {
      const response = await fetch(`${URL}/api/offers`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offer),
        }
      )

      if (!response.ok) throw new Error('Error al crear la oferta');

      const data = await response.json()
      dispatch({ type: "add_offer", payload: data })
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center">
         <div className="p-5 mt-5" >
         <h1>Añadir una oferta: </h1>
          <div className="row ">
            <div className="col-12">
                <label htmlFor="title" className="text-white mt-4">Titulo de la oferta:</label>
                <input type="text" className="input1 mt-2" id="title" name="title" placeholder="Escribe el titulo de su oferta"  onChange={saveChange}></input>

                <label htmlFor="description" className="text-white mt-4">Detalles de la oferta:</label>
                <input type="text" className="input1 mt-2" id="description" name="description" placeholder="Describe los detalles de su oferta" onChange={saveChange}></input>

                <label htmlFor="type_offert" className="text-white mt-4">Tipo de oferta:</label>
                <input type="text" className="input1 mt-2" id="type_offert" name="type_offert" placeholder="Tipo de oferta" onChange={saveChange}></input>

                <label htmlFor="duration" className="text-white mt-4">Duracion del viaje:</label>
                <input type="text" className="input1 mt-2" id="duration" name="duration" placeholder="Duración de la oferta" onChange={saveChange}></input>

                <label htmlFor="location" className="text-white mt-4">Lugar de la oferta:</label>
                <input type="text" className="input1 mt-2" id="location" name="location" placeholder="Lugar de la oferta" onChange={saveChange}></input>

                <label htmlFor="tags" className="text-white mt-4">Etiquetas de la oferta:</label>
                <input type="text" className="input1 mt-2" id="tags" name="tags" placeholder="Etiqueta de la oferta" onChange={saveChange}></input>

                <label htmlFor="price" className="text-white mt-4">Precio de la oferta: </label>
                <input type="number" className="input1 mt-2" id="price" name="price" placeholder="Detalla el precio de su oferta" onChange={saveChange}></input>

                <label htmlFor="image_url" className="text-white mt-4">Imagen de la oferta: </label>
                <input type="url" className="input1 mt-2" id="image_url" name="image_url" placeholder="Importa la url de la imagen de su oferta" onChange={saveChange}></input>

                <label htmlFor="created_at" className="text-white mt-4">Fecha de creacion</label>
                <input type="datetime-local" className="input1 mt-2" id="created_at" name="created_at" placeholder="" onChange={saveChange}></input>

                {/* <h3 className="mt-5">Añadir imagenes en los detalles de la oferta</h3>

                <label htmlFor="imagedetails1" className="text-white">Primera imagen: </label>
                <input type="url" className="input1" id="imagedetails1" name="imagedetails1" placeholder="Importa la url de la imagen" onChange={saveChange}></input>

                <label htmlFor="imagedetails2" className="text-white">Segunda imagen: </label>
                <input type="url" className="input1" id="imagedetails2" name="imagedetails2" placeholder="Importa la url de la imagen" onChange={saveChange}></input>

                <label htmlFor="imagedetails3" className="text-white">Tercera imagen: </label>
                <input type="url" className="input1" id="imagedetails3" name="imagedetails3" placeholder="Importa la url de la imagen" onChange={saveChange}></input>

                <label htmlFor="imagedetails4" className="text-white">Cuarta imagen: </label>
                <input type="url" className="input1" id="imagedetails4" name="imagedetails4" placeholder="Importa la url de la imagen" onChange={saveChange}></input> */}
            </div>
            
          </div>
          
        </div> 

        {/* VISTA PREVIA DE LA OFERTA */}
        <div>
        <div className="mt-4 p-4 me-4 align-items-center" id="cardaddoffer">
          <h2>Vista previa de la oferta:</h2>
          <CardPreview offer={offer}/>
        </div>

        <div className=" mt-4 d-flex align-items-center justify-content-center gap-3">
          <div>
              <button  className="createaddbtn" onClick={() => newOffert()}>Crear Oferta</button>
          </div>

          <div>
            <Link to="/">
                <button className="createaddbtn">Ofertas</button>
            </Link>
          </div>
        </div>
        </div>
        
        
        



    </div>
  );
};



