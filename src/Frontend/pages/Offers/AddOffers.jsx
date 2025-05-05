import React, { use, useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";
const URL = import.meta.env.VITE_BACKEND_URL
import "./AddOffers.css"


export const AddOffers = () => {
  const {dispatch } = useGlobalReducer();
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
  });

  useEffect(() => {
    if (!hasRole(['COMPANY_ADMIN'])) {
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
    <div className="container">
         <div className="card p-5 mt-5 d-flex align-items-center justify-content-center" >
         <h1>Añadir una oferta: </h1>
          <div className="row ">
            <div className="col-12">
                <label htmlFor="title" className="text-white">:Titulo de la oferta</label>
                <input type="text" className="input1" id="title" name="title" placeholder="Escribe el titulo de su oferta"  onChange={saveChange}></input>

                <label htmlFor="description" className="text-white">Detalles de la oferta:</label>
                <input type="text" className="input1" id="description" name="description" placeholder="Describe los detalles de su oferta" onChange={saveChange}></input>

                <label htmlFor="type_offert" className="text-white">Detalles de la oferta:</label>
                <input type="text" className="input1" id="type_offert" name="type_offert" placeholder="Tipo de oferta" onChange={saveChange}></input>

                <label htmlFor="duration" className="text-white">Detalles de la oferta:</label>
                <input type="text" className="input1" id="duration" name="duration" placeholder="Duración de la oferta" onChange={saveChange}></input>

                <label htmlFor="location" className="text-white">Detalles de la oferta:</label>
                <input type="text" className="input1" id="location" name="location" placeholder="Lugar de la oferta" onChange={saveChange}></input>

                <label htmlFor="tags" className="text-white">Etiquetas de la oferta:</label>
                <input type="text" className="input1" id="tags" name="tags" placeholder="Etiqueta de la oferta" onChange={saveChange}></input>

                <label htmlFor="price" className="text-white">Precio de la oferta: </label>
                <input type="number" className="input1" id="price" name="price" placeholder="Detalla el precio de su oferta" onChange={saveChange}></input>

                <label htmlFor="image_url" className="text-white">Imagen de la oferta: </label>
                <input type="url" className="input1" id="image_url" name="image_url" placeholder="Importa la url de la imagen de su oferta" onChange={saveChange}></input>

                <label htmlFor="created_at" className="text-white">Fecha de creacion</label>
                <input type="datetime-local" className="input1" id="created_at" name="created_at" placeholder="" onChange={saveChange}></input>
            </div>

            
          </div>
            

            

        </div> 

        {/* VISTA PREVIA DE LA OFERTA */}
        <div className="card mt-4 p-4 " id="cardaddoffer">
          <h2>Vista previa de la oferta:</h2>
          <div className="text-center">
            {offer.image_url && (<img src={offer.image_url} alt="Vista previa" style={{maxWidth:"100%", maxHeight: "200px"}}/>)}
            {/* <h3>{offer.title || "Título de la oferta"}</h3>
            <p className="text-white">{offer.description || "Descripción de la oferta"}</p>
            <p className="text-white"><strong className="text-white">Tipo:</strong> {offer.type_offert || "Tipo de oferta"}</p>
            <p className="text-white"><strong>Tipo:</strong> {offer.price || "0.00"}</p> */}
          </div>
        </div>


        <div className=" mt-4 d-flex align-items-center justify-content-center">
          <div>
              <button  className=" btn btn-light" onClick={newOffert}>Crear Oferta</button>
          </div>

          <div>
            <Link to="/">
                <button className="btn btn-light">Ofertas</button>
            </Link>
          </div>
        </div>

    </div>
  );
};



