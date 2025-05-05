import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "./Tagline.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { OffersCard } from "../../pages/Offers/OffersCard";
import Modal from "../Modal/Modal";
import autocomplete from "../../Mock/autocomplete.json"

function Tagline() {
    const { store, dispatch } = useGlobalReducer();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [personas, setPersonas] = useState(1);
    const [destino, setDestino] = useState("");
    const [showModal, setShowModal] = useState(false);
    const API_KEY = "5f9b8dee36msh09331b9ab9a4fbbp1b81efjsne60799c1c2e1"
    const origin = store.origen
    const destination = store.destino

    const [filteredOffers, setFilteredOffers] = useState([]);

     
   // const url = `https://skyscanner89.p.rapidapi.com/flights/roundtrip/list?${origin}`
    

    //const URL = `https://skyscanner89.p.rapidapi.com/flights/roundtrip/list?originId=27542715&destinationId=27537542`;
    const options = {
        
    headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'skyscanner89.p.rapidapi.com'
    }
    };

    const showData = async () =>{

        
    try {
        const response = await fetch(URL, options);
        const result = await response.json();
        console.log(result.data.flightQuotes.results)
      
        dispatch({type:"get_offersAPI", payload:result.data.flightQuotes.results})
    
    } catch (error) {
        console.error("Error la offerAPI",error.message)
    }
    }

    useEffect(()=>{
        
    showData()
    },[])
    
  



    const handleBuscar = async () => {
        // if (!destino || !startDate || !endDate) {
        //     alert("Selecciona destino y fechas");
        //     return;
        // }

        const res = store.offers.filter((oferta) => oferta.title === destino);
        setFilteredOffers(res);
        setShowModal(true);
        // Llama a tu API para obtener ofertas filtradas
        // const res = await fetch(
        //     `/api/offers?destino=${destino}&start=${startDate.toISOString()}&end=${endDate.toISOString()}`
        // );
        // const data = await res.json();
        // setFilteredOffers(data.offers || []);
        // setShowModal(true);
    };

    return (
        <section className="tg-container mt-3">
            <video
                className="tg-video"
                src="video-viajes-escala.mp4"
                style={{
                    width: "100%",
                    height: "800px",
                    borderRadius: "10px",
                    position: "relative",
                    zIndex: "0",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    objectFit: "cover",
                }}
                autoPlay
                loop
                muted
            ></video>
            <h1 className="tg-tittle">
                Discover Your Next <br /> Adventure Awaits You
            </h1>
            <p className="tg-texts">
                Explore breathtaking destinations that ignite your wanderlust.
                Let us guide you to unforgettable experiences and hidden gems
                around the globe.
            </p>
            <button className="tg-btn-explore">Explore</button>
            <button className="tg-btn-LearnMore">Learn More</button>
            <div className="search-tvl-container">
                <section className="tvl-section-box d-flex">
                    <fieldset className="box-tvl-destination d-flex flex-column">
                        <label>Origen:</label>
                        <select
                            name="origen"
                            id="select-origen"
                            onChange={(e) => setDestino(e.target.value)}
                            value={destino}
                        >
                            <option value="" defaultChecked hidden>
                                Elige el origen
                            </option>
                            <option value="entityid">Barcelona</option>
                            <option value="New York">New York</option>
                            <option value="Tokio">Tokio</option>
                            <option value="Francia">Francia</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Australia">Australia</option>
                            <option value="Peru">Peru</option>
                            <option value="Nassau">Nassau</option>
                            <option value="Rome">Rome</option>
                        </select>
                    </fieldset>
                    <fieldset className="box-tvl-destination d-flex flex-column">
                        <label>Destino:</label>
                        <select
                            name="destino"
                            id="select-destino"
                            onChange={(e) => setDestino(e.target.value)}
                            value={destino}
                        >
                            <option value="" defaultChecked hidden>
                                Elige el destino
                            </option>
                            <option value="Barcelona">Barcelona</option>
                            <option value="New York">New York</option>
                            <option value="Tokio">Tokio</option>
                            <option value="Francia">Francia</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Australia">Australia</option>
                            <option value="Peru">Peru</option>
                            <option value="Nassau">Nassau</option>
                            <option value="Rome">Rome</option>
                        </select>
                    </fieldset>
                    <fieldset className="box-tvl-dates d-flex flex-column">
                        <label>Fechas:</label>
                        <section>
                            <DatePicker
                                className="start-end-date"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Fecha de salida"
                                dateFormat="dd/MM/yyyy"
                                popperPlacement="bottom-start"
                                popperClassName="custom-datepicker"
                                portalId="root-portal"
                                // popperContainer={document.getElementById('root-portal')}
                            />
                            <DatePicker
                                className="start-end-date"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Fecha de regreso"
                                dateFormat="dd/MM/yyyy"
                                popperPlacement="bottom-start"
                                popperClassName="custom-datepicker"
                                portalId="root-portal"
                                // popperContainer={document.getElementById('root-portal')}
                            />
                        </section>
                    </fieldset>
                    <button className="tvl-btn-explore" onClick={handleBuscar}>
                        Buscar ofertas
                    </button>
                </section>
            </div>
            <div>
                    {store?.offersAPI.map((offer,index)=>{
                  
                    
                    <div key={index}>
                        <p>Precio
                            {offer.price}
                        </p>
                    </div>
                
                    })}

            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>Ofertas disponibles</h2>
                    {filteredOffers.length === 0 ? (
                        <p>No hay ofertas para los criterios seleccionados.</p>
                    ) : (
                        <ul>
                            {store.offers.filter(offert => offert.title === destino).map(oferta => (
                                <li key={oferta.id} className="offer-item">
                                    <OffersCard offert={oferta} />
                                </li>
                            ))};
                        </ul>
                    )}
                </Modal>
            )}
        </section>
    );
}

export default Tagline;
