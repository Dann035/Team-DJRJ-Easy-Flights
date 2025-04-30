import "./Features.css";

import { Link } from 'react-router-dom';

function Features() {
    return (
        <section className="ft-container container text-center">
            <div>
                <p>Explore</p>
                <h1 className="fw-bold">Discover Your Next Adventure with Us</h1>
                <p>Uncover breathtaking destinations that inspire wanderlust. Our curated travel packages offer unique experiences tailored just for you.</p>
            </div>
            <div className="d-flex justify-content-between p-3 gap-3">
                {/* Box Feature 1: Destinations */}
            <Link to="/destinations" className="box-feature feature-1">
              <i></i>
              <h3>¿No sabes a dónde viajar? Inspírate aquí</h3>
              <p>Explora 10 destinos turísticos inolvidables y elige tu próxima aventura soñada.</p>
            </Link>

                {/* Box Feature 2: Packages */}
                <Link to="/packages" className="box-feature feature-2">
                    <i></i>
                    <h3>Tailored Travel Packages for Every Traveler</h3>
                    <p>Experience the world with packages designed for you.</p>
                </Link>

                {/* Box Feature 3: Tools */}
                <Link to="/tools" className="box-feature feature-3">
                 <i></i>
                 <h3>Planifica tu Viaje y Divide los Gastos</h3>
                 <p>Calcula tu presupuesto, reparte gastos entre amigos y organiza cada detalle fácilmente.</p>
                </Link>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-4 mb-3">
                <button className="btn-feature">Learn More</button>
                <button className="btn-feature">Sign Up</button>
            </div>
        </section>
    )
}

export default Features;
