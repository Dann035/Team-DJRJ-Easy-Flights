import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import "./AboutUser.css";
import { useParams } from "react-router-dom";
import { a } from "framer-motion/client";

const URL = import.meta.env.VITE_BACKEND_URL;

const AboutUser = () => {
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
    // Use token instead of access_token for consistency
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
        // const fetchUserData = async () => {
        //     setIsLoading(true);
        //     try {
        //         // Parallel data fetching for better performance
        //         const [profileRes, historyRes, purchasesRes] = await Promise.all([
        //             fetch("/api/user/profile"),
        //             fetch("/api/user/history"),
        //             fetch("/api/user/purchases")
        //         ]);

        //         const profileData = await profileRes.json();
        //         const historyData = await historyRes.json();
        //         const purchasesData = await purchasesRes.json();

        //         setUserData(profileData);
        //         setHistory(historyData);
        //         setPurchases(purchasesData);
        //     }catch (error) {
        //         console.error("Error fetching user data:", error);
        //         showNotification("Error loading profile data", "error");
        //     } finally {
        //         setIsLoading(false);
        //     }
        // }

        // fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("avatar", file);

        // Obtener el ID de usuario del localStorage si no está disponible en params
        const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
        const id = userId || userInfo.id;

        if (!id) {
            showNotification("User ID not found", "error");
            return;
        }

        // Depuración para ver qué se está enviando
        console.log("Sending file:", file);
        console.log("User ID:", id);
        console.log("Token:", access_token);

        fetch(`${URL}/api/user/${id}/avatar/upload`, {
            method: "POST",
            headers: {
                // Solo incluir Authorization, NO Content-Type para FormData
                Authorization: `Bearer ${access_token}`
            },
            body: formData,
        })
            .then(async (res) => {
                if (!res.ok) {
                    // Intentar obtener detalles del error
                    let errorMessage = `Error ${res.status}: ${res.statusText}`;
                    try {
                        const errorData = await res.json();
                        console.error("Error details:", errorData);
                        errorMessage = errorData.msg || errorMessage;
                    } catch (e) {
                        console.error("Could not parse error response:", e);
                    }
                    throw new Error(errorMessage);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Success response:", data);
                
                // Actualizar el avatar en localStorage para que se refleje en la navbar
                const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
                userInfo.avatar = data.user.avatar;
                localStorage.setItem("user", JSON.stringify(userInfo));
                
                // Actualizar el estado con el nuevo avatar
                setUserData(prev => ({
                    ...prev,
                    avatar: data.user.avatar
                }));
                
                showNotification("Avatar updated successfully", "success");
            })
            .catch((err) => {
                console.error("Error uploading avatar:", err);
                showNotification(`Failed to upload avatar: ${err.message}`, "error");
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
            // Obtener el ID de usuario del localStorage si no está disponible en params
            const userInfo1 = JSON.parse(localStorage.getItem("user") || "{}");
            const id = userId || userInfo.id;

            if (!id) {
                showNotification("User ID not found", "error");
                return;
            }

            // Send only the fields that should be updated
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
                    console.error("Error details:", errorData);
                    errorMessage = errorData.msg || errorMessage;
                } catch (e) {
                    console.error("Could not parse error response:", e);
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Profile update response:", data);
            
            // Actualizar información en localStorage
            let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
            userInfo.name = userData.name;
            userInfo.subscription = userData.subscription;
            localStorage.setItem("user", JSON.stringify(userInfo));
            
            showNotification("Profile updated successfully", "success");
        } catch (error) {
            console.error("Error updating profile:", error);
            showNotification("Failed to update profile", "error");
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
                    {activeTab === "history" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="ausr-tab-content"
                        >
                            <h2 className="ausr-section-title">
                                Historial de Viajes
                            </h2>
                            {history.length > 0 ? (
                                <div className="ausr-cards-grid">
                                    {history.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="ausr-card"
                                            variants={itemVariants}
                                        >
                                            <div className="ausr-card-header">
                                                <h3>{item.destination}</h3>
                                                <span className="ausr-card-date">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <div className="ausr-card-body">
                                                {item.details && (
                                                    <p>{item.details}</p>
                                                )}
                                                {item.price && (
                                                    <p className="ausr-card-price">
                                                        {item.price}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="ausr-empty-state">
                                    <svg
                                        className="ausr-empty-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 15h8"></path>
                                        <path d="M9 9h.01"></path>
                                        <path d="M15 9h.01"></path>
                                    </svg>
                                    <p>No tienes historial de viajes</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "purchases" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="ausr-tab-content"
                        >
                            <h2 className="ausr-section-title">
                                Historial de Compras
                            </h2>
                            {purchases.length > 0 ? (
                                <div className="ausr-cards-grid">
                                    {purchases.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="ausr-card"
                                            variants={itemVariants}
                                        >
                                            <div className="ausr-card-header">
                                                <h3>{item.product}</h3>
                                                <span className="ausr-card-price">
                                                    {item.price}
                                                </span>
                                            </div>
                                            <div className="ausr-card-body">
                                                {item.date && (
                                                    <p className="ausr-card-date">
                                                        {item.date}
                                                    </p>
                                                )}
                                                {item.details && (
                                                    <p>{item.details}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="ausr-empty-state">
                                    <svg
                                        className="ausr-empty-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                        <line
                                            x1="3"
                                            y1="6"
                                            x2="21"
                                            y2="6"
                                        ></line>
                                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                                    </svg>
                                    <p>No tienes compras registradas</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "subscription" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="ausr-tab-content"
                        >
                            <h2 className="ausr-section-title">
                                Información de Perfil
                            </h2>
                            <form className="ausr-form" onSubmit={handleSubmit}>
                                <motion.div
                                    className="ausr-form-group"
                                    variants={itemVariants}
                                >
                                    <label htmlFor="name">Nombre:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                    />
                                </motion.div>

                                <motion.div
                                    className="ausr-form-group"
                                    variants={itemVariants}
                                >
                                    <label htmlFor="email">
                                        Email (no editable):
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        disabled
                                        className="ausr-input-disabled"
                                    />
                                </motion.div>

                                <motion.div
                                    className="ausr-form-group"
                                    variants={itemVariants}
                                >
                                    <label htmlFor="subscription">
                                        Subscripción:
                                    </label>
                                    <select
                                        id="subscription"
                                        name="subscription"
                                        value={userData.subscription}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Selecciona un plan
                                        </option>
                                        <option value="basic">Básico</option>
                                        <option value="premium">Premium</option>
                                        <option value="vip">VIP</option>
                                    </select>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="ausr-btn ausr-btn-primary"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Guardar Cambios
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </section>
            </div>
        </motion.div>
    );
};

export default AboutUser;
