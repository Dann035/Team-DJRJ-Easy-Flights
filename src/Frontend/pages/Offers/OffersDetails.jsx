import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin,Star } from "lucide-react";
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
        <h1 className="text-center mt-5">{offer.title}</h1>
        <div>
          {offer ? (
            <div>
              <div className="h-96 banner card">
                <div className="overlay">
                  <h1 className="">{offer.title}</h1>
                    <p>
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-xl">LOCATION</span>
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1">RATING</span>
                    </p>
                </div>
              </div>

              <section className="details">
                <div className="info">
                    <h2>About this Trip</h2>
                    <p>Experience luxury and tranquility in this stunning beach resort. Perfect for couples and honeymoons.</p>

                    <h3>What's Included</h3>
                        <ul className="included">
                            <li><span className="material-icons check">check_circle</span> Luxury accommodation</li>
                            <li><span className="material-icons check">check_circle</span> Airport transfers</li>
                            <li><span className="material-icons check">check_circle</span> Spa treatment</li>
                            <li><span className="material-icons check">check_circle</span> All meals included</li>
                            <li><span className="material-icons check">check_circle</span> Daily activities</li>
                        </ul>

                    <h3>Amenities</h3>
                    <div className="tags">
                            <span>Private Beach</span>
                            <span>Spa</span>
                            <span>Water Sports</span>
                            <span>Fine Dining</span>
                    </div>

                    <div className="sidebar">
                    <h2>$1299</h2>
                        <p>per person</p>
                        <div className="details-box">
                        <p><span className="material-icons">calendar_today</span> 7 days</p>
                        <p><span className="material-icons">group</span> 2 persons</p>
                        </div>
                        <a href="#" className="book-btn">Book Now</a>
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