// ...existing imports...
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./AboutUser.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";

const URL = import.meta.env.VITE_BACKEND_URL;

const AboutUser = () => {
    const { user, setUser } = useAuth();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        subscription: "",
        avatar: null,
    });
    const [history, setHistory] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [activeTab, setActiveTab] = useState("history");
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "",
    });

    const { userId } = useParams();
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        const userLS = localStorage.getItem("user");
        if (userLS) {
            const userObj = JSON.parse(userLS);
            setUserData((prev) => ({
                ...prev,
                name: userObj.name || "",
                email: userObj.email || "",
                subscription: userObj.subscription || "",
                avatar: userObj.avatar || null,
            }));
            setIsLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
        const id = userId || userInfo.id;

        if (!id) {
            showNotification("User ID not found", "error");
            return;
        }

        fetch(`${URL}/api/user/${id}/avatar/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            body: formData,
        })
            .then(async (res) => {
                if (!res.ok) {
                    let errorMessage = `Error ${res.status}: ${res.statusText}`;
                    try {
                        const errorData = await res.json();
                        errorMessage = errorData.msg || errorMessage;
                    } catch (e) {}
                    throw new Error(errorMessage);
                }
                return res.json();
            })
            .then((data) => {
                // Actualizar el avatar en localStorage
                const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
                userInfo.avatar = data.user.avatar;
                localStorage.setItem("user", JSON.stringify(userInfo));

                // Actualizar el usuario global del contexto
                setUser((prev) => ({
                    ...prev,
                    avatar: data.user.avatar
                }));

                // Actualizar el estado local
                setUserData(prev => ({
                    ...prev,
                    avatar: data.user.avatar
                }));

                showNotification("Avatar actualizado correctamente", "success");
            })
            .catch((err) => {
                showNotification(`Error al subir avatar: ${err.message}`, "error");
            });
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userInfo1 = JSON.parse(localStorage.getItem("user") || "{}");
            const id = userId || userInfo1.id;

            if (!id) {
                showNotification("User ID not found", "error");
                return;
            }

            const response = await fetch(
                `${URL}/api/user/${id}/profile/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${access_token}`,
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                let errorMessage = `Error ${response.status}: ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.msg || errorMessage;
                } catch (e) {}
                throw new Error(errorMessage);
            }

            const data = await response.json();

            // Actualizar información en localStorage y contexto global
            let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
            userInfo.name = userData.name;
            userInfo.subscription = userData.subscription;
            localStorage.setItem("user", JSON.stringify(userInfo));
            setUser((prev) => ({
                ...prev,
                name: userData.name,
                subscription: userData.subscription
            }));

            showNotification("Perfil actualizado correctamente", "success");
        } catch (error) {
            showNotification("Error al actualizar perfil", "error");
        }
    };

    // Animation variants for framer-motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4 },
        },
    };

    if (isLoading) {
        return (
            <div className="ausr-loading">
                <div className="ausr-loading-spinner"></div>
                <p>Cargando perfil...</p>
            </div>
        );
    }

    return (
        <motion.div
            className="ausr-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {notification.show && (
                <div
                    className={`ausr-notification ausr-notification-${notification.type}`}
                >
                    {notification.message}
                </div>
            )}

            <div className="ausr-header">
                <h1>Perfil de Usuario</h1>
                <p className="ausr-subtitle">
                    Gestiona tu información y preferencias
                </p>
            </div>

            <div className="ausr-content">
                <aside className="ausr-sidebar">
                    <div className="ausr-avatar-section">
                        <div className="ausr-avatar-wrapper">
                            {userData.avatarPreview || userData.avatar ? (
                                <img
                                    src={
                                        userData.avatarPreview ||
                                        userData.avatar
                                    }
                                    alt="Avatar"
                                    className="ausr-avatar"
                                />
                            ) : (
                                <div className="ausr-avatar ausr-avatar-default">
                                    {userData.name
                                        ? userData.name.charAt(0).toUpperCase()
                                        : "U"}
                                </div>
                            )}
                            <div className="ausr-avatar-overlay">
                                <label
                                    htmlFor="avatar-upload"
                                    className="ausr-avatar-upload-btn"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line
                                            x1="12"
                                            y1="3"
                                            x2="12"
                                            y2="15"
                                        ></line>
                                    </svg>
                                </label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatar}
                                    className="ausr-avatar-input"
                                />
                            </div>
                        </div>
                        <h3 className="ausr-username">{userData.name}</h3>
                        <p className="ausr-user-email">{userData.email}</p>
                    </div>

                    <nav className="ausr-nav">
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`ausr-nav-btn ${
                                activeTab === "history" ? "active" : ""
                            }`}
                        >
                            <svg
                                className="ausr-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Historial de Viajes
                        </button>
                        <button
                            onClick={() => setActiveTab("purchases")}
                            className={`ausr-nav-btn ${
                                activeTab === "purchases" ? "active" : ""
                            }`}
                        >
                            <svg
                                className="ausr-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            Compras
                        </button>
                        <button
                            onClick={() => setActiveTab("subscription")}
                            className={`ausr-nav-btn ${
                                activeTab === "subscription" ? "active" : ""
                            }`}
                        >
                            <svg
                                className="ausr-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 1v22"></path>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            Subscripción
                        </button>
                    </nav>
                </aside>

                <section className="ausr-main">
                    {/* ...rest of your code... */}
                </section>
            </div>
        </motion.div>
    );
};

export default AboutUser;