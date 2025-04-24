import "./Tagline.css";

function Tagline() {
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
            <div>
                <input type="text" />
                <button>Search</button>
            </div>
        </section>
        
    )
}

export default Tagline;
