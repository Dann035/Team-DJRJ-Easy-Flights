
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "./Tagline.css";

function Tagline() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [personas, setPersonas] = useState(1);

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
                <section>
                    <button className="btn-tvl-type"><i className="fa-solid fa-hotel"></i>Hoteles</button>
                    <button className="btn-tvl-type"><i className="fa-solid fa-plane"></i>Transporte + Hotel</button>
                    <button className="btn-tvl-type"><i className="fa-solid fa-ship"></i>Cruceros</button>
                    <button className="btn-tvl-type"><i className="fa-solid fa-suitcase"></i>Grandes Viajes</button>
                    <button className="btn-tvl-type"><i className="fa-solid fa-train"></i>Trenes</button>
                    <button className="btn-tvl-type"><i className="fa-solid fa-sun"></i>Caribe</button>
                    <button className="btn-tvl-type"><i className="fa-solid fa-tree"></i>Paquete Disney</button>
                    <button className="btn-tvl-type"><i className="fa-solid fa-plane-up"></i>Vuelos</button>
                </section>
                <section className="tvl-section-box d-flex">
                    <fieldset className="box-tvl-destination d-flex flex-column">
                        <label>Destino</label>
                        <input 
                        className="ipt-tvl-destination"
                        name="destination"
                        type="text" 
                        placeholder="Ciudad, región o nombre del alojamiento" />
                    </fieldset>
                    <fieldset className="box-tvl-dates d-flex flex-column">
                        <label>Fechas</label>
                        <DatePicker
                            className="start-date"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Fecha de salida"
                            dateFormat="dd/MM/yyyy"
                        />
                        <DatePicker
                            className="end-date"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="Fecha de regreso"
                            dateFormat="dd/MM/yyyy"
                        />
                    </fieldset>
                    <fieldset className="d-flex flex-column">
                        <label>Personas</label>
                        <input
                            className="ipt-tvl-persona"
                            name="person"
                            type="number"
                            min="1"
                            max="10"
                            value={personas}
                            onChange={e => setPersonas(e.target.value)}
                            style={{ width: "60px" }}
                        />
                    </fieldset>
                </section>
            </div>
        </section>
        
    )
}

export default Tagline;
