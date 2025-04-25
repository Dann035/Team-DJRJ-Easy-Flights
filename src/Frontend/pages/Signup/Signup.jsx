import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/signup";
import "./Signup.css";

function Signup() {
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            signupUser(formData)
            navigate('/login');
        }catch(err){
            console.error(err);
            alert('Error al registrar el usuario');
            navigate('/login');
            return;
        }
    }

    return (
        <>
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
                            <span onClick={() => navigate('/')} className="btn-cancelar"><i class="fa-solid fa-xmark"></i></span>
                            <h2>Registrarse</h2>
                            <div className="icons">
                                <i class="fa-brands fa-google"></i>
                                <i class="fa-brands fa-facebook"></i>
                                <i class="fa-brands fa-linkedin"></i>
                                <i class="fa-brands fa-apple"></i>
                            </div>
                            <p>O registrate con una cuenta</p>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <i class="fa-solid fa-user"></i>
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
                                    <i class="fa-solid fa-envelope"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.email}
                                        type="email"
                                        name="email"
                                        placeholder="Correo Electronico"
                                        required
                                    />
                                </label>
                                <label>
                                    <i class="fa-solid fa-lock"></i>
                                    <input
                                        onChange={handleChange}
                                        value={formData.password}
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        required
                                    />
                                </label>
                                <a className="forgot-pass" href="/forgotPass">
                                    Olvidaste tu contraseña?
                                </a>
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
