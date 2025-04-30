
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { use, useState } from "react";
import "./Tagline.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { OffersCard } from "../../pages/Offers/OffersCard";
import Modal from "../Modal/Modal";

function Tagline() {
    const { store, dispatch } = useGlobalReducer();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [personas, setPersonas] = useState(1);
    const [destino, setDestino] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [filteredOffers, setFilteredOffers] = useState([]);

    const handleBuscar = async () => {
        if (!destino || !startDate || !endDate) {
            alert("Selecciona destino y fechas");
            return;
        }


        const res = store.offers.filter(oferta => oferta.title === destino);
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
            }} autoPlay loop muted></video>
            {/* <img className="tg-image" src="public/avion-tagline.gif" alt="Tagline"/> */}
            <h1 className="tg-tittle">Discover Your Next <br/> Adventure Awaits You</h1>
            <p className="tg-texts">Explore breathtaking destinations that ignite your wanderlust. Let us guide you to unforgettable experiences and hidden gems around the globe.</p>
            <button className="tg-btn-explore">Explore</button>
            <button className="tg-btn-LearnMore">Learn More</button>
            <div className="search-tvl-container">
                <section className="tvl-section-box d-flex">
                    <fieldset className="box-tvl-destination d-flex flex-column">
                        <label>Destino:</label>
                        <select name="destino" id="select-destino" onChange={(destino)=>setDestino(destino)} value={destino}>
                            <option value="0" selected hidden>Elige el destino</option>
                            <option value="1">Barcelona</option>
                            <option value="3">New York</option>
                            <option value="4">Tokio</option>
                            <option value="5">Francia</option>
                            <option value="6">Dubai</option>
                            <option value="7">Australia</option>
                            <option value="8">Peru</option>
                            <option value="9">Nassau</option>
                            <option value="10">Rome</option>
                        </select>
                    </fieldset>
                    <fieldset className="box-tvl-dates d-flex flex-column">
                        <label>Fechas:</label>
                        <section>
                            <DatePicker
                                className="start-end-date"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
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
                                onChange={date => setEndDate(date)}
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
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>Ofertas disponibles</h2>
                    {filteredOffers.length === 0 ? (
                        <p>No hay ofertas para los criterios seleccionados.</p>
                    ) : (
                        <ul>
                            {filteredOffers.map(oferta => (
                                <li key={oferta.id}>
                                    <OffersCard offert={oferta} />
                                    <strong>{oferta.title}</strong> - {oferta.price}€
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal>
            )}
        </section>
        
    )
}

export default Tagline;
