import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash, FaPlane } from "react-icons/fa";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import "./Login.css";

const URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        show: false,
        text: "",
        type: "error",
        duration: 5000
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        roles: ["USER"]
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validación básica
        if (!formData.email || !formData.password) {
            setNotification({
                show: true,
                text: "Por favor completa todos los campos",
                type: "warning",
                duration: 3000
            });
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(URL + "/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            
            if (!data.token) {
                throw new Error("Error al iniciar sesión");
            }
            
            localStorage.setItem("access_token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            setNotification({
                show: true,
                text: "¡Inicio de sesión exitoso!",
                type: "success",
                duration: 3000
            });
            
            setTimeout(() => {
                navigate("/");
            }, 1500);
            
        } catch (err) {
            console.error(err);
            setNotification({
                show: true,
                text: "Error al iniciar sesión. Intenta nuevamente.",
                type: "error",
                duration: 5000
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Variantes de animación para elementos
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1] 
            } 
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    // Partículas flotantes (efecto visual)
    const particles = Array.from({ length: 20 }).map((_, i) => (
        <div 
            key={i} 
            className="particle"
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
            }}
        />
    ));

    return (
        <div className="form-body">
            <div className="particles-container">
                {particles}
            </div>
            
            <motion.div 
                className="container-form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <button 
                className="btn-cancelar" 
                onClick={() => navigate("/")}
                >
                <FaPlane />
                </button>
                <div className="information">
                    <div className="info-childs">
                        <motion.h2 
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            ¡Bienvenido de nuevo!
                        </motion.h2>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Accede a tu cuenta para gestionar tus vuelos y disfrutar de una experiencia personalizada.
                        </motion.p>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            ¿No tienes una cuenta?
                        </motion.p>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <Link to="/signup" className="btn-register">
                                Regístrate
                            </Link>
                        </motion.div>
                    </div>
                </div>
                
                <div className="form-information">
                    <div className="form-information-childs">
                        <motion.h2
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Iniciar Sesión
                        </motion.h2>
                        
                        <motion.div 
                            className="icons"
                            initial="hidden"
                            animate="visible"
                            variants={staggerChildren}
                        >
                            <motion.i variants={fadeInUp}><FaEnvelope /></motion.i>
                            <motion.i variants={fadeInUp}><FaLock /></motion.i>
                        </motion.div>
                        
                        <motion.form 
                            onSubmit={handleSubmit}
                            initial="hidden"
                            animate="visible"
                            variants={staggerChildren}
                        >
                            <motion.label variants={fadeInUp}>
                                <i><FaEnvelope /></i>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Correo electrónico" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </motion.label>
                            
                            <motion.label variants={fadeInUp}>
                                <i><FaLock /></i>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    placeholder="Contraseña" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <i 
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: "pointer", marginLeft: "auto" }}
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </i>
                            </motion.label>

                            <motion.div variants={fadeInUp}>
                                <Link to="/forgotPass" className="forgot-pass">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </motion.div>
                            
                            <motion.input 
                                type="submit" 
                                value={isLoading ? "Cargando..." : "Iniciar Sesión"}
                                disabled={isLoading}
                                variants={fadeInUp}
                            />
                        </motion.form>
                    </div>
                </div>
            </motion.div>
            
            {/* Efecto de escáner futurista */}
            <div className="scanner-effect" />

            {/* Notificaciones */}
            <NotificationModal
                text={notification.text}
                show={notification.show}
                onClose={() => setNotification({...notification, show: false})}
                type={notification.type}
                duration={notification.duration}
                position="top-center"
            />

        </div>
    );
}

export default Login;
