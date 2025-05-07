import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/signup";
import NotificationModal from "../../components/NotificationModal/NotificationModal";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showSocialAuth, setShowSocialAuth] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER"
    });

    // Validar que las contraseñas coincidan
    useEffect(() => {
        if (formData.password && formData.confirmPassword) {
            setPasswordsMatch(formData.password === formData.confirmPassword);
        } else {
            setPasswordsMatch(null);
        }
    }, [formData.password, formData.confirmPassword]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificar que las contraseñas coincidan antes de enviar
        if (!passwordsMatch) {
            setShowError(true);
            return;
        }
        
        try {
            // Eliminar confirmPassword antes de enviar al servidor
            const { confirmPassword, ...dataToSubmit } = formData;
            await signupUser(dataToSubmit);
            setShowSuccess(true);
            navigate('/login');
        } catch(err) {
            console.error(err);
            setShowError(true);
            return;
        }
    }

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Función para alternar la visibilidad de la confirmación de contraseña
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Funciones para manejar la autenticación con redes sociales
    const handleGoogleSignup = async () => {
        try {
            // Redirigir a la URL de autenticación de Google
            window.location.href = `${process.env.REACT_APP_API_URL || ''}/api/auth/google`;
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            setShowSocialAuth(true);
        }
    };

    const handleFacebookSignup = async () => {
        try {
            // Redirigir a la URL de autenticación de Facebook
            window.location.href = `${process.env.REACT_APP_API_URL || ''}/api/auth/facebook`;
        } catch (error) {
            console.error("Error al iniciar sesión con Facebook:", error);
            setShowSocialAuth(true);
        }
    };

    const handleLinkedInSignup = async () => {
        try {
            // Redirigir a la URL de autenticación de LinkedIn
            window.location.href = `${process.env.REACT_APP_API_URL || ''}/api/auth/linkedin`;
        } catch (error) {
            console.error("Error al iniciar sesión con LinkedIn:", error);
            setShowSocialAuth(true);
        }
    };

    const handleAppleSignup = async () => {
        try {
            // Redirigir a la URL de autenticación de Apple
            window.location.href = `${process.env.REACT_APP_API_URL || ''}/api/auth/apple`;
        } catch (error) {
            console.error("Error al iniciar sesión con Apple:", error);
            setShowSocialAuth(true);
        }
    };

    return (
        <>
            {showSuccess && (
                <NotificationModal
                    text="Registro exitoso"
                    show={showSuccess}
                    onClose={() => setShowSuccess(false)}
                    type="success"
                    duration={3000}
                    position="top-center"
                />
            )}
            {showError && (
                <NotificationModal
                    text="Error al registrar el usuario"
                    show={showError}
                    onClose={() => setShowError(false)}
                    type="error"
                    duration={5000}
                    position="top-center"
                />
            )}
            {showSocialAuth && (
                <NotificationModal
                    text="Error al Iniciar Sesión con Cuentas de Redes Sociales"
                    show={showSocialAuth}
                    onClose={() => setShowSocialAuth(false)}
                    type="info"
                    duration={3000}
                    position="top-center"
                />
            )}
            <div className="form-body">
                <div className="container-form">
                    <div className="information">
                        <div className="info-childs">
                            <h2>Bienvenido</h2>
                            <p>
                                Registrate y reserva ya tus merecidas vacaciones
                            </p>
                            <input
                            onClick={() => navigate('/login')}
                            type="button" 
                            value="Iniciar Sesión" 
                            />
                        </div>
                    </div>
                    <div className="form-information">
                        <div className="form-information-childs">
                            <span onClick={() => navigate('/')} className="btn-cancelar"><i className="fa-solid fa-xmark"></i></span>
                            <h2>Registrarse</h2>
                            <div className="icons">
                                <i className="fa-brands fa-google" onClick={handleGoogleSignup} title="Registrarse con Google"></i>
                                <i className="fa-brands fa-facebook" onClick={handleFacebookSignup} title="Registrarse con Facebook"></i>
                                <i className="fa-brands fa-linkedin" onClick={handleLinkedInSignup} title="Registrarse con LinkedIn"></i>
                                <i className="fa-brands fa-apple" onClick={handleAppleSignup} title="Registrarse con Apple"></i>
                            </div>
                            <a href="/signupCompany" className="forgot-pass">O registrate como empresa</a>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.name}
                                        type="text"
                                        name="name"
                                        placeholder="Nombres Completo"
                                        required
                                    />
                                </label>
                                <label>
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.email}
                                        type="email"
                                        name="email"
                                        placeholder="Correo Electronico"
                                        required
                                    />
                                </label>
                                <label className={passwordsMatch === false ? "password-error" : passwordsMatch === true ? "password-match" : ""}>
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.password}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Contraseña"
                                        required
                                    />
                                    <i 
                                        className={`password-toggle fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} 
                                        onClick={togglePasswordVisibility}
                                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    ></i>
                                    {formData.confirmPassword && (
                                        <i 
                                            className={`password-validation-icon fa-solid ${passwordsMatch ? "fa-check" : "fa-times"}`}
                                            title={passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                                        ></i>
                                    )}
                                </label>
                                <label className={passwordsMatch === false ? "password-error" : passwordsMatch === true ? "password-match" : ""}>
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.confirmPassword}
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirmar Contraseña"
                                        required
                                    />
                                    <i 
                                        className={`password-toggle fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`} 
                                        onClick={toggleConfirmPasswordVisibility}
                                        title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    ></i>
                                    {formData.confirmPassword && (
                                        <i 
                                            className={`password-validation-icon fa-solid ${passwordsMatch ? "fa-check" : "fa-times"}`}
                                            title={passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                                        ></i>
                                    )}
                                </label>
                                <br />
                                <input
                                    className="btn-register"
                                    type="submit"
                                    value="Registrarse"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
