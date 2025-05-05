import React,{useEffect} from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import roundTrip from "../../../Mock/roundtrip.json";

function OffersAPI() {
    const { store } = useGlobalReducer();
    const data = store.offersAPI || [];
    return (
        <div className="container">
            <h1 className="text-center my-4">Ofertas de Vuelos</h1>
            <div className="row">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((offer, index) => (
                        <div className="col-md-4 mb-4" key={offer?.content?.id}>
                            <div className="card h-100">
                                <img
                                    src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZpYWplfGVufDB8fDB8fHww"
                                    className="card-img-top"
                                    alt="Vuelo"
                                    style={{
                                        maxHeight: "200px",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="card-body">
                                    <p className="card-text">
                                        <strong>Origen:</strong>{" "}
                                        {offer?.content?.inboundLeg?.destinationAirport?.name || "N/A"}
                                        &nbsp;
                                        <strong>Destino:</strong>{" "}
                                        {offer?.content?.inboundLeg?.originAirport?.name || "N/A"}
                                    </p>
                                    <p className="card-text">
                                        <strong>Fecha de Salida:</strong>{" "}
                                        {offer?.content?.inboundLeg?.localDepartureDate || "N/A"}
                                        <br />
                                        <strong>Duración:</strong>{" "}
                                        {offer?.content?.tripDuration || "N/A"}
                                        <br />
                                        <strong>Precio:</strong>{" "}
                                        {offer?.content?.price || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">
                        No se encontraron ofertas disponibles.
                    </p>
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

