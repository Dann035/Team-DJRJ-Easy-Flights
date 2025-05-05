import useGlobalReducer from "../../hooks/useGlobalReducer";
import { OffersCard } from "../../pages/Offers/OffersCard";
import autocomplete from "../../Mock/autocomplete.json"
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./Tagline.css";

function Tagline() {
    const { store, dispatch } = useGlobalReducer();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [personas, setPersonas] = useState(1);
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const API_KEY = "3df7b5ea34msh823b5e336152f23p145132jsn0be3c1afda1b"

    const [filteredOffers, setFilteredOffers] = useState([]);

    const URL = `https://skyscanner89.p.rapidapi.com/flights/roundtrip/list?`;
    const options = {
        
    headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': 'skyscanner89.p.rapidapi.com'
    }
    };

    const showData = async () =>{
        if (!origen || !destino) {
            alert("Selecciona origen y destino");
            return;
        }
        try {
            const response = await fetch(URL + `originId=${origen}&destinationId=${destino}`, options);
            const data = await response.json();
            const results = data?.data?.flightQuotes?.results || [];
            dispatch({type:"get_offersAPI", payload: results});

        }catch(error){
            console.error("Error la offerAPI",error.message)
            dispatch({type:"get_offersAPI", payload:[]})
        }
    }

    return (
        <section className="tg-container mt-3">
            <video
                className="tg-video"
                src="tg-video-official.mp4"
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
            <button className="tg-btn-explore" onClick={() => navigate('/login')}>Explore</button>
            <button className="tg-btn-LearnMore">Learn More</button>
            <div className="search-tvl-container">
                <section className="tvl-section-box d-flex">
                <fieldset className="box-tvl-destination d-flex flex-column">
                        <label>Origen:</label>
                        <select
                            name="origen"
                            id="select-origen"
                            onChange={(e) => setOrigen(e.target.value)}
                            value={origen}
                        >
                            <option value="" defaultChecked hidden>
                                Elige el destino
                            </option>
                            <option value="27542715">Las Vegas</option>
                            <option value="27537542">New York</option>
                            <option value="27542089">Tokio</option>
                            <option value="27536644">Miami</option>
                            <option value="27544008">London</option>
                            <option value="27540602">México</option>
                            <option value="27546347">Puerto Rico</option>
                            <option value="27539733">París</option>
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
                            <option value="27542715">Las Vegas</option>
                            <option value="27537542">New York</option>
                            <option value="27542089">Tokio</option>
                            <option value="27536644">Miami</option>
                            <option value="27544008">London</option>
                            <option value="27540602">México</option>
                            <option value="27546347">Puerto Rico</option>
                            <option value="27539733">París</option>
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
                    <button 
                        className="tvl-btn-explore"
                        onClick={showData}>
                        Buscar ofertas
                    </button>
                </section>
            </div>
        </section>
    );
}

export default Tagline;
