import React, { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL


export const AddOffers = () => {
  const {dispatch } = useGlobalReducer();
  const navigate = useNavigate()

  const [offer, SetOffer] = useState({
    title: "",
    description: "",
    price: "",
    type_offert: "",
    image_url: "",
  });

  

  const saveChange = (e) => {
    SetOffer({
      ...offer,
      [e.target.id]: e.target.value,
    });
  };

  const newOffert = () => {
    fetch(
      `${url}/api/offers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offer),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "add_offer", payload: data })
        navigate("/")
      });
  };

  return (
    <div className="container-fluid">
        <div className="card p-5" id="cardaddoffer">
            <h1>Añadir una oferta: </h1>

            <label htmlFor="title" className="text-white">:Titulo de la oferta</label>
            <input type="text" id="title" name="title" placeholder="Escribe el titulo de su oferta" onChange={saveChange}></input>

            <label htmlFor="description" className="text-white">Detalles de la oferta:</label>
            <input type="text" id="description" name="description" placeholder="Describe los detalles de su oferta" onChange={saveChange}></input>

            <label htmlFor="type_offert" className="text-white">Detalles de la oferta:</label>
            <input type="text" id="type_offert" name="type_offert" placeholder="Tipo de oferta" onChange={saveChange}></input>

            {/* <label htmlFor="type_offert">:Tipo de oferta: </label>
            <select name="type_offert" id="type_offert">
                <option value="Viaje en avion">Viaje en avion</option>
                <option value="Viaje en crucero">Viaje en crucero</option>
            </select> */}

            <label htmlFor="price" className="text-white">Precio de la oferta: </label>
            <input type="number" id="price" name="price" placeholder="Detalla el precio de su oferta" onChange={saveChange}></input>

            <label htmlFor="image_url" className="text-white">Imagen de la oferta: </label>
            <input type="url" id="image_url" name="image_url" placeholder="Importa la url de la imagen de su oferta" onChange={saveChange}></input>

            <label htmlFor="created_at" className="text-white">Fecha de creacion</label>
            <input type="datetime-local" id="created_at" name="created_at" placeholder="" onChange={saveChange}></input>

        </div>

        {/* VISTA PREVIA DE LA OFERTA */}
        <div className="card mt-4 p-4 " id="cardaddoffer">
          <h2>Vista previa de la oferta:</h2>
          <div className="text-center">
            {offer.image_url && (<img src={offer.image_url} alt="Vista previa" style={{maxWidth:"100%", maxHeight: "200px"}}/>)}
            <h3>{offer.title || "Título de la oferta"}</h3>
            <p className="text-white">{offer.description || "Descripción de la oferta"}</p>
            <p className="text-white"><strong className="text-white">Tipo:</strong> {offer.type_offert || "Tipo de oferta"}</p>
            <p className="text-white"><strong>Tipo:</strong> {offer.price || "0.00"}</p>
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



