import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useLanguage } from "../../context/LanguageContext";
import "./Tagline.css";
import "react-datepicker/dist/react-datepicker.css";

// Icons
import {
    FaPlane,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUsers,
    FaSearch,
    FaInfoCircle,
} from "react-icons/fa";



function Tagline() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const { store, dispatch } = useGlobalReducer();
    const [endDate, setEndDate] = useState(null);
    const [personas, setPersonas] = useState(1);
    const [destino, setDestino] = useState("");
    const [origen, setOrigen] = useState("");
    const { texts } = useLanguage();

    const navigate = useNavigate();
    const URL = import.meta.env.VITE_BACKEND_URL;
    const API_KEY = import.meta.env.API_KEY;

    function validateOrigins(){
        if (!origen || !destino) {
            // Use a more elegant notification instead of alert
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
            return;
        }
    }

    const showData = async () => {
        validateOrigins();
        setIsSearching(true);

        try {
            const response = await fetch( URL + `/api/vuelos?origen=${destino}&destino=${origen}`);
            const data = await response.json();
            dispatch({ type: "clear_offersAPI"});
            dispatch({ type: "set_offersAPI", payload: data });
        } catch (error) {
            console.error("Error la offerAPI", error.message);
            dispatch({ type: "clear_offersAPI"});
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        } finally {
            setIsSearching(false);
        }
    };

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };

    // Destinations data with images and descriptions
    const destinations = [
        {
            id: "27542715",
            name: texts.lasVegas,
            image: "/images/destinations/las-vegas.jpg",
            desc: "La ciudad que nunca duerme",
        },
        {
            id: "27537542",
            name: texts.newYork,
            image: "/images/destinations/new-york.jpg",
            desc: "La Gran Manzana",
        },
        {
            id: "27542089",
            name: texts.tokyo,
            image: "/images/destinations/tokyo.jpg",
            desc: "Tradición y modernidad",
        },
        {
            id: "27536644",
            name: texts.miami,
            image: "/images/destinations/miami.jpg",
            desc: "Playas y vida nocturna",
        },
        {
            id: "27536655",
            name: texts.london,
            image: "/images/destinations/london.jpg",
            desc: "Historia y cultura",
        },
        {
            id: "27538888",
            name: texts.mexico,
            image: "/images/destinations/mexico.jpg",
            desc: "Gastronomía y color",
        },
        {
            id: "27546347",
            name: texts.puertoRico,
            image: "/images/destinations/puerto-rico.jpg",
            desc: "Paraíso caribeño",
        },
        {
            id: "27539999",
            name: texts.paris,
            image: "/images/destinations/paris.jpg",
            desc: "La ciudad del amor",
        },
    ];

    let hoy = new Date();

    const fechas = [
        
    ]

    return (
        <div className="tagline-wrapper">
            {/* Hero Section with Video Background */}
            <section className="hero-section">
                <div className="video-container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                        className="video-overlay"
                    ></motion.div>
                    <video
                        className="background-video"
                        src="tg-video-official.mp4"
                        autoPlay
                        loop
                        muted
                        onLoadedData={handleVideoLoad}
                    ></video>
                </div>

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h1 className="hero-title">
                        {texts.discoverAdventure}
                        <br />
                        <span className="highlight-text">{texts.aventure}</span>
                    </h1>
                    <p className="hero-description">{texts.heroDescription}</p>
                    <div className="hero-buttons">
                        <motion.button
                            className="btn-explore"
                            onClick={() => navigate("/login")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {texts.explore}
                        </motion.button>
                        <motion.button
                            className="btn-learn-more"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {texts.learnMore}
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Search Flight Section */}
            <motion.section
                className="search-flight-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <div className="search-container">
                    <h2 className="search-title">{texts.findIdealFlight}</h2>

                    <div className="search-form">
                        <div className="form-row">
                            <div className="form-group origin">
                                <label>
                                    <FaPlane className="icon icon-takeoff" />
                                    {texts.origin}
                                </label>
                                <select
                                    name="origen"
                                    id="select-origen"
                                    onChange={(e) => setOrigen(e.target.value)}
                                    value={origen}
                                    className="styled-select"
                                >
                                    <option value="" defaultChecked hidden>
                                        {texts.selectOrigin}
                                    </option>
                                    {destinations.map((dest) => (
                                        <option
                                            key={`origin-${dest.id}`}
                                            value={dest.id}
                                        >
                                            {dest.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group destination">
                                <label>
                                    <FaMapMarkerAlt className="icon" />
                                    {texts.destination}
                                </label>
                                <select
                                    name="destino"
                                    id="select-destino"
                                    onChange={(e) => setDestino(e.target.value)}
                                    value={destino}
                                    className="styled-select"
                                >
                                    <option value="" defaultChecked hidden>
                                        {texts.selectDestination}
                                    </option>
                                    {destinations.map((dest) => (
                                        <option
                                            key={`dest-${dest.id}`}
                                            value={dest.id}
                                        >
                                            {dest.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group dates">
                                <label>
                                    <FaCalendarAlt className="icon" />
                                    {texts.dates}
                                </label>
                                <div className="date-pickers">
                                    <DatePicker
                                        className="date-input"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText={
                                            texts.departurePlaceholder
                                        }
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                    />
                                    <DatePicker
                                        className="date-input"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        placeholderText={
                                            texts.returnPlaceholder
                                        }
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                            </div>

                            <div className="form-group passengers">
                                <label>
                                    <FaUsers className="icon" />
                                    {texts.passengersLabel}
                                </label>
                                <div className="passenger-selector">
                                    <button
                                        className="passenger-btn"
                                        onClick={() =>
                                            setPersonas(
                                                Math.max(1, personas - 1)
                                            )
                                        }
                                        disabled={personas <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="passenger-count">
                                        {personas}
                                    </span>
                                    <button
                                        className="passenger-btn"
                                        onClick={() =>
                                            setPersonas(
                                                Math.min(10, personas + 1)
                                            )
                                        }
                                        disabled={personas >= 10}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            className="search-button"
                            onClick={showData}
                            disabled={isSearching}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {isSearching ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                <>
                                    <FaSearch className="search-icon" />{" "}
                                    {texts.searchFlightsBtn}
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* Popular Destinations Section */}
            {/* <section className="popular-destinations">
                <h2 className="section-title">Destinos Populares</h2>
                <p className="section-subtitle">Descubre nuestros destinos más buscados</p>
                
                <div className="destinations-grid">
                    {destinations.slice(0, 4).map((dest, index) => (
                        <motion.div 
                            className="destination-card"
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ 
                                y: -10,
                                boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
                            }}
                        >
                            <div className="destination-image">
                                <img src={dest.image || `https://source.unsplash.com/300x200/?${dest.name}`} alt={dest.name} />
                            </div>
                            <div className="destination-info">
                                <h3>{dest.name}</h3>
                                <p>{dest.desc}</p>
                                <button className="btn-view-deals">Ver Ofertas</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <motion.button 
                    className="btn-view-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Ver Todos los Destinos
                </motion.button>
            </section> */}

            {/* Notification Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="notification-modal"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <FaInfoCircle className="info-icon" />
                        <p>{texts.pleaseSelectOriginDest}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Tagline;
