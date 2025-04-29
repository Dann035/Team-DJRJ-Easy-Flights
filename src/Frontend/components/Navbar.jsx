import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="nav-container navbar navbar-expand-lg">
            <div className="container-fluid">
                {/* He modificado el logo porque no llevaba al inicio de la página */}
                <img
                    src="logo-easy-flights.webp"
                    alt="Logo Easy-Flights"
                    className="img-nav navbar-brand"
                    width={'100px'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate("/")}
                />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse navbar-interno"
                    id="navbarSupportedContent"
                >
                    <ul className="nav-list navbar-nav mb-2 mb-lg-0">
                        <li className="item-nav nav-item">
                            <Link className="link-nav nav-link" to="/destinations">
                                Destinations
                            </Link>
                        </li>
                        <li className="item-nav nav-item">
                            <Link className="link-nav nav-link" to="/travel-tips">
                                Travel Tips
                            </Link>
                        </li>
                        <li className="item-nav nav-item">
                            <Link className="link-nav nav-link" to="#">
                                Gallery
                            </Link>
                        </li>
                        <li className="item-nav nav-item dropdown">
                            <a
                                className="link-nav nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                More Info
                            </a>
                            <ul className="item-nav-drdown dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        Action
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        Another action
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        Something else here
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div>
                        <button id="btn-nav-login" onClick={() => navigate("/signup")}>
                            <img
                                src="./user-profile.gif"
                                alt="login"
                                className="img-nav-login"
                            />
                        </button>
                        <button className="btn-nav-exp">Explore</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
