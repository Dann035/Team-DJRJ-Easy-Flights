import React, { useState } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { useLanguage } from "../../../context/LanguageContext";
import "./OffersAPI.css";
import { FaMapMarkerAlt, FaClock, FaPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

function OffersAPI() {
  const { texts } = useLanguage();
  const { store } = useGlobalReducer();
  const data = store.offersAPI || [];
  const [displayCount, setDisplayCount] = useState(3);

  const show4More = (displayCount) => {
    setDisplayCount(displayCount + 3);
  };
  const limitedOffers = data.slice(0, displayCount);

  return (
    <div className="container mt-3">
      <h1 className="title-offers text-center">{texts.flightsOffers}</h1>
      <div className="flights-container">
        {Array.isArray(data) && data.length > 0 ? (
          limitedOffers.map((offer) => (
            <div className="flight-offer-card" key={offer?.content?.id}>
              <div className="flight-offer-inner">
                <div className="flight-offer-front">
                  <div className="flight-image-container">
                    <img
                      src={offer?.content?.imgURL || "http://via.placeholder.com/300"}
                      className="flight-image"
                      alt="Vuelo"
                    />
                    <div className="flight-price">
                      {offer?.content?.price || "N/A"}
                    </div>
                  </div>
                  <div className="flight-details">
                    <div>
                      <h3 className="flight-title">{texts.specialOffers}</h3>
                      <div className="flight-origin">
                        <FaPlane />
                        <span>
                          <strong>Origen:</strong>{" "}
                          {offer?.content?.inboundLeg?.destinationAirport
                            ?.name || "N/A"}
                        </span>
                      </div>
                      <div className="flight-destination">
                        <FaMapMarkerAlt />
                        <span>
                          <strong>Destino:</strong>{" "}
                          {offer?.content?.inboundLeg?.originAirport?.name ||
                            "N/A"}
                        </span>
                      </div>
                      <div className="flight-duration">
                        <FaClock />
                        <span>
                          <strong>Duración:</strong>{" "}
                          {offer?.content?.tripDuration || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flight-offer-back">
                  <h3 className="flight-back-title">Detalles del Vuelo</h3>
                  <p>
                    <strong>Fecha de Salida:</strong>{" "}
                    {offer?.content?.inboundLeg?.localDepartureDate || "N/A"}
                  </p>
                  <p>
                    <strong>Duración:</strong>{" "}
                    {offer?.content?.tripDuration || "N/A"}
                  </p>
                  <p>
                    <strong>Precio:</strong> {offer?.content?.price || "N/A"}
                  </p>
                  <Link
                    to={`/offers/${offer?.content?.id}/payment`}
                    className="flight-link"
                  >
                    {texts.reserveNow}
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="flights-message">{texts.alertsearchOffers}</p>
        )}
        {data.length > displayCount && (
          <div>
            <button
              className="botonAdd"
              onClick={() => show4More(displayCount)}
            >
              {texts.viewMoreOffers}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OffersAPI;

// return (
//   <div className="container">
//     <h1 className="text-center my-4">Ofertas de Vuelos</h1>
//     <div className="row">
//       {data ? (
//         .map((offer, index) => (
//           <div className="col-md-4 mb-4" key={index}>
//             <div className="card h-100">
// <img
//   src={offer.image_url || "https://via.placeholder.com/300"}
//   className="card-img-top"
//   alt={offer.destination}
//   style={{ maxHeight: "200px", objectFit: "cover" }}
// />
//               <div className="card-body">
//                 <h5 className="card-title">{offer.title || `Vuelo a ${offer.destination}`}</h5>
//                 <p className="card-text">
//                   <strong>Origen:</strong> {offer.origin}
//                 </p>
//                 <p className="card-text">
//                   <strong>Destino:</strong> {offer.destination}
//                 </p>
//                 <p className="card-text">
//                   <strong>Precio:</strong> {offer.price} €
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center">No se encontraron ofertas disponibles.</p>
//       )}
//     </div>
//   </div>
// );
