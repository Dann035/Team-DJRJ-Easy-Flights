import React, { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./OffersCard.css"
import { Users ,MapPin, Calendar} from "lucide-react";
const url = import.meta.env.VITE_BACKEND_URL

export const OffersCard = ({offert}) => {
  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: offert.title,
    description: offert.description,
    price: offert.price,
    type_offert: offert.type_offert,
    image_url: offert.image_url,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteOffer = () => {
    fetch(
      `${url}/api/offers/${offert.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          dispatch({ type: "delete_offers", payload: offert.id });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    fetch(
      `${url}/api/offers/${offert.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch({ type: "edit_offer", payload: data });
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    // <div className="container">
    //   <div className="card">
    //     <div className="container text-center">
    //       <div className="row">
    //         <div>
    //           <img src={offert.image_url} alt="1" />
    //           <p>{offert.title}</p>
    //           <p>{offert.description}</p>
    //           <p>{offert.type_offert}</p>
    //           <p>{offert.price}€</p>

             

    //           <button onClick={()=>deleteOffer()}>❌</button>
    //           <button onClick={()=> setShowModal(true)}>✏️</button>
    //         </div>

    //       </div>
    //     </div>

    //   </div>
    // </div>
    
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          
          <div className="h-100 overflow-hidden">
                 <img src={offert.image_url} className="w-full h-100 object-cover rounded-top img-fluid"/>
          </div>
          <div className="p-6">
                {/* <h3 className="text-xl font-semibold mb-2">{offert.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>LOCATION</span>
                </div> */}
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>DURATION</span>
                  <Users className="w-4 h-4 ml-4 mr-1" />
                  <span>PERSONAS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${offert.price}
                  </span>
                
                </div>
              </div>
        </div>
        <div className="flip-card-back">
          <p className="title"><p>{offert.title}</p></p>
          <Link to={"/offerdetails/" + offert.id}>
                  <button className="learn-more">
                    <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Learn More</span>
                  </button>
                  <div>
                      <button onClick={()=>deleteOffer()}>❌</button>
                  </div>
                
          </Link>
        </div>
      </div>
    </div>

    
  );

}

