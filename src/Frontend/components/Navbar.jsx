import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../hooks/useAuthContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const {user, logout, setUser} = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="nav-container navbar navbar-expand-lg">
            <div className="container-fluid">
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
                    <ul className="nav-list navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="item-nav nav-item">
                            <Link className="link-nav nav-link" to="destinations">
                                Destinations
                            </Link>
                        </li>
                        <li className="item-nav nav-item">
                            <Link className="link-nav nav-link" to="/travel-tips">
                                Travel Tips
                            </Link>
                        </li>
                    </ul>
                    <div>
                    {user ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: "#eee",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        fontSize: "1.2rem",
                                        color: "#333"
                                    }}
                                    title={user.name}
                                >
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                                <button className="btn btn-outline-danger" onClick={handleLogout}>
                                    Cerrar sesión
                                </button>
                            </div>
                        ) : (
                            <button id="btn-nav-login" onClick={() => navigate("/signup")}>
                                <img
                                    src="./user-profile.gif"
                                    alt="login"
                                    className="img-nav-login"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
