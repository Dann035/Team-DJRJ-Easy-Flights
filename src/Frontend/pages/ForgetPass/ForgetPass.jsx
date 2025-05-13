import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash, FaPlane, FaKey } from "react-icons/fa";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import { sendVerificationEmail, verifyCode, resetPassword } from "../../services/passwordReset";
import "./ForgetPass.css";

function ForgetPass() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({
        show: false,
        text: "",
        type: "error",
        duration: 5000
    });

    const [step, setStep] = useState(1); // 1: Email, 2: Código, 3: Nueva contraseña
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(null);
    
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    // Validar que las contraseñas coincidan
    useEffect(() => {
        if (password.newPassword && password.confirmPassword) {
            setPasswordsMatch(password.newPassword === password.confirmPassword);
        } else {
            setPasswordsMatch(null);
        }
    }, [password.newPassword, password.confirmPassword]);

    // Función para enviar correo electrónico de verificación
    const handleSendEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (!email) {
            setNotification({
                show: true,
                text: "Por favor ingresa tu correo electrónico",
                type: "warning",
                duration: 3000
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await sendVerificationEmail(email);
            setNotification({
                show: true,
                text: "Se ha enviado un código de verificación a tu correo electrónico",
                type: "success",
                duration: 5000
            });
            setStep(2); // Avanzar al paso de ingreso del código
        } catch (error) {
            console.error(error);
            setNotification({
                show: true,
                text: error.message || "Error al enviar el correo electrónico. Inténtalo nuevamente.",
                type: "error",
                duration: 5000
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Función para verificar el código enviado
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (!verificationCode || verificationCode.length !== 6) {
            setNotification({
                show: true,
                text: "Por favor ingresa el código de 6 dígitos",
                type: "warning",
                duration: 3000
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await verifyCode(email, verificationCode);
            setNotification({
                show: true,
                text: "Código verificado correctamente",
                type: "success",
                duration: 3000
            });
            setStep(3); // Avanzar al paso de cambio de contraseña
        } catch (error) {
            console.error(error);
            setNotification({
                show: true,
                text: error.message || "Código incorrecto. Inténtalo nuevamente.",
                type: "error",
                duration: 5000
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Función para cambiar la contraseña
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Validar contraseñas
        if (!password.newPassword || !password.confirmPassword) {
            setNotification({
                show: true,
                text: "Por favor completa todos los campos",
                type: "warning",
                duration: 3000
            });
            setIsLoading(false);
            return;
        }

        if (password.newPassword !== password.confirmPassword) {
            setNotification({
                show: true,
                text: "Las contraseñas no coinciden",
                type: "warning",
                duration: 3000
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await resetPassword(email, verificationCode, password.newPassword);
            
            if (response.status === 'OK') {
                setNotification({
                    show: true,
                    text: "Contraseña cambiada correctamente",
                    type: "success",
                    duration: 3000
                });
                
                // Redireccionar al login después de unos segundos
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                throw new Error(response.message || "Error desconocido");
            }
        } catch (error) {
            console.error(error);
            setNotification({
                show: true,
                text: error.message || "Error al cambiar la contraseña. Inténtalo nuevamente.",
                type: "error",
                duration: 5000
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Función para alternar la visibilidad de la confirmación de contraseña
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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

    // Efecto de partículas flotantes (visual)
    const numberOfParticles = 60;
    const generateParticles = (count) => {
        return Array.from({ length: count }).map((_, i) => (
            <div 
                key={i} 
                className="particle"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${3 + Math.random() * 4}px`,
                    height: `${3 + Math.random() * 4}px`,
                    opacity: `${0.2 + Math.random() * 0.5}`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${8 + Math.random() * 15}s`
                }}
            />
        ));
    };

    const particles = generateParticles(numberOfParticles);

    // Renderizado de los diferentes pasos del proceso
    const renderStep = () => {
        switch(step) {
            case 1: // Paso 1: Ingreso de correo electrónico
                return (
                    <motion.form 
                        onSubmit={handleSendEmail}
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                    >
                        <motion.h3 variants={fadeInUp}>
                            Ingresa tu correo electrónico para recuperar tu contraseña
                        </motion.h3>
                        
                        <motion.label variants={fadeInUp}>
                            <i><FaEnvelope /></i>
                            <input 
                                type="email" 
                                placeholder="Correo electrónico" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </motion.label>
                        
                        <motion.input 
                            type="submit" 
                            value={isLoading ? "Enviando..." : "Enviar código"}
                            disabled={isLoading}
                            className="btn-submit"
                            variants={fadeInUp}
                        />
                    </motion.form>
                );
                
            case 2: // Paso 2: Verificación del código
                return (
                    <motion.form 
                        onSubmit={handleVerifyCode}
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                    >
                        <motion.h3 variants={fadeInUp}>
                            Ingresa el código de verificación
                        </motion.h3>
                        <motion.p variants={fadeInUp} className="info-text">
                            Hemos enviado un código de 6 dígitos a tu correo electrónico
                        </motion.p>
                        
                        <motion.label variants={fadeInUp}>
                            <i><FaKey /></i>
                            <input 
                                type="text" 
                                placeholder="Código de verificación" 
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                maxLength={6}
                                pattern="[0-9]{6}"
                                title="Ingresa un código de 6 dígitos"
                                required
                                className="verification-code"
                            />
                        </motion.label>
                        
                        <motion.div variants={fadeInUp} className="actions">
                            <button 
                                type="button" 
                                onClick={() => {
                                    setStep(1);
                                    setVerificationCode("");
                                }} 
                                className="btn-secondary"
                            >
                                Volver
                            </button>
                            <button 
                                type="submit" 
                                disabled={isLoading} 
                                className="btn-submit"
                            >
                                {isLoading ? "Verificando..." : "Verificar"}
                            </button>
                        </motion.div>
                    </motion.form>
                );
                
            case 3: // Paso 3: Cambio de contraseña
                return (
                    <motion.form 
                        onSubmit={handlePasswordReset}
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                    >
                        <motion.h3 variants={fadeInUp}>
                            Establece tu nueva contraseña
                        </motion.h3>
                        
                        <motion.label 
                            variants={fadeInUp}
                            className={passwordsMatch === false ? "password-error" : passwordsMatch === true ? "password-match" : ""}
                        >
                            <i><FaLock /></i>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Nueva contraseña"
                                value={password.newPassword}
                                onChange={(e) => setPassword({...password, newPassword: e.target.value})}
                                required
                            />
                            <i
                                className={`password-toggle fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} 
                                onClick={toggleConfirmPasswordVisibility}
                                title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                            </i>
                            {password.confirmPassword && (
                                <i 
                                    className={`password-validation-icon fa-solid ${passwordsMatch ? "fa-check" : "fa-times"}`}
                                    title={passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                                ></i>
                            )}
                        </motion.label>

                        <motion.label 
                            variants={fadeInUp}
                            className={passwordsMatch === false ? "password-error" : passwordsMatch === true ? "password-match" : ""}
                        >
                            <i><FaLock /></i>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                placeholder="Confirmar contraseña"
                                value={password.confirmPassword}
                                onChange={(e) => setPassword({...password, confirmPassword: e.target.value})}
                                required
                            />
                            <i
                                className={`password-toggle fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} 
                                onClick={toggleConfirmPasswordVisibility}
                                title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                            </i>
                            {password.confirmPassword && (
                                <i 
                                    className={`password-validation-icon fa-solid ${passwordsMatch ? "fa-check" : "fa-times"}`}
                                    title={passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                                ></i>
                            )}
                        </motion.label>

                        <motion.div variants={fadeInUp} className="actions">
                            <button 
                                type="button" 
                                onClick={() => {
                                    setStep(2);
                                    setVerificationCode("");
                                }} 
                                className="btn-secondary"
                            >
                                Volver
                            </button>
                            <button 
                                type="submit" 
                                disabled={isLoading || !passwordsMatch} 
                                className="btn-submit"
                            >
                                {isLoading ? "Cambiando..." : "Cambiar contraseña"}
                            </button>
                        </motion.div>
                    </motion.form>
                );
                
            default:
                return null;
        }
    };

    return (
        <div className="form-body">
            <div className="particles-container">
                {particles}
            </div>
            
            <motion.div 
                className="container-form forget-pass-container"
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
                            Recupera tu acceso
                        </motion.h2>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            ¿Olvidaste tu contraseña? No te preocupes, te ayudaremos a recuperar tu acceso.
                        </motion.p>
                        <motion.p
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            ¿Recuerdas tu contraseña?
                        </motion.p>
                        <motion.button
                            onClick={() => navigate("/login")}
                            className="btn-login"
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Iniciar Sesión
                        </motion.button>
                    </div>
                </div>

                <div className="form-information">
                    <div className="form-information-childs">
                        <motion.h2
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            Recuperar Contraseña
                        </motion.h2>
                        
                        {/* Aquí va el contenido dinámico según el paso */}
                        {renderStep()}
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

export default ForgetPass;