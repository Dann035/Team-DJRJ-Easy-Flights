import { useNavigate } from "react-router-dom";
import "./Navbar.css";


export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="nav-container navbar navbar-expand-lg">
            <div className="container-fluid">
                <img src="logo-easy-flights.webp" alt="Logo Easy-Flights" className="navbar-brand" width={'100px'} />
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
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="nav-list navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="item-nav nav-item">
                            <a
                                className="link-nav nav-link"
                                aria-current="page"
                                href="#"
                            >
                                Destinations
                            </a>
                        </li>
                        <li className="item-nav nav-item">
                            <a className="link-nav nav-link" href="#">
                                Travel Tips
                            </a>
                        </li>
                        <li className="item-nav nav-item">
                            <a className="link-nav nav-link" aria-disabled="true">
                                Gallery
                            </a>
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
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
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
        </nav>
    );
};
