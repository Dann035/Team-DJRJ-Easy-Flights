import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin,Star, StarsIcon } from "lucide-react";
import "./OffersDetails.css"
const url = import.meta.env.VITE_BACKEND_URL



export const OffersDetails = () =>{

    const {id} = useParams();
    const [offer,setOffer] = useState({})
    

    
    useEffect(() => {
        
        fetch(`${url}/api/offers/${id}`, {
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
        <div>
          {offer ? (
            <div>
              <div className="text-center my-3">
                  <h1 >{offer.title}</h1>
              </div>
              
              
              <section className="object-cover w-100 h-100" id="img-offer">
                
                <img
                  src="https://images.unsplash.com/photo-1576397753762-206624e9a2cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhha29uZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="1"
                />
                <img
                  src="https://images.unsplash.com/photo-1583901342520-0ce87c2750a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhha29uZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="1"
                />
                <img
                  src="https://images.unsplash.com/photo-1576397753762-206624e9a2cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhha29uZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="1"
                />
                <img
                  src="https://images.unsplash.com/photo-1576397753762-206624e9a2cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhha29uZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="1"
                />
                <img
                  src="https://images.unsplash.com/photo-1576397753762-206624e9a2cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhha29uZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="1"
                />
              </section>

              {/* <div className="d-flex align-items-center justify-content-center container-fluid" >
                
                  <Calendar/> <span>{offer.duration}</span>
               
                
                  <Calendar/> <span>{offer.duration}</span>
                
              
                  <Calendar/> <span>{offer.duration}</span>
                
              </div> */}
                
                <p>
                    
                    
                </p>
                
            

              <section className="details">
                <div className="info">
                  <div className="">
                      <h2>Información</h2>
                        <p className="mx-4">{offer.description}</p>

                        <h3>¿Qué incluye?</h3>
                            <ul className="included">
                                <li><span className="text-success">✔</span> </li>
                                <li><span className="text-success">✔</span> Airport transfers</li>
                                <li><span className="text-success">✔</span> Spa treatment</li>
                                <li><span className="text-success">✔</span> All meals included</li>
                                <li><span className="text-success">✔</span> Daily activities</li>
                            </ul>

                        <h3>Amenities</h3>
                        <div className="tags">
                                <span>Private Beach</span>
                                <span>Spa</span>
                                <span>Water Sports</span>
                                <span>Fine Dining</span>
                        </div>
                  </div>
                  
                  <div className="">
                    
                    
                      <div className="sidebar">
                      <h2>{offer.price}&nbsp;€</h2>
                        <p>Por persona</p>
                        <div className="details-box">
                        <p><Calendar/>{offer.duration}</p>
                       
                        </div>
                        <a href="#" className="book-btn">Book Now</a>
                        <div className="rating text-center">
                            <input defaultValue={5} name="rating" id="star5" type="radio" />
                            <label htmlFor="star5" />
                            <input defaultValue={4} name="rating" id="star4" type="radio" />
                            <label htmlFor="star4" />
                            <input defaultValue={3} name="rating" id="star3" type="radio" />
                            <label htmlFor="star3" />
                            <input defaultValue={2} name="rating" id="star2" type="radio" />
                            <label htmlFor="star2" />
                            <input defaultValue={1} name="rating" id="star1" type="radio" />
                            <label htmlFor="star1" />
                        </div>
                      </div>
                    
                  </div>      
                </div>
              </section>

            </div>
          ) : (
            <p>Cargando detalles de la oferta...</p>
          )}
        </div>
      </div>
    );
}