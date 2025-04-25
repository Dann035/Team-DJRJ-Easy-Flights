import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("user");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: userRole,
    });

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
        setFormData({
            ...formData,
            role: e.target.value,
        });
    };

    const handleRole = () => {
        if (userRole === "user") {
            navigate("/signup");
        }
        if (userRole === "company") {
            navigate("/signupCompany");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch("http://127.0.0.1:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!data.token) {
                throw new Error("Error al login");
                navigate("/login");
                console.error(res.statusText);
            }
            localStorage.setItem("access_token", data.token);
            alert("Login correcto");
            navigate("/");
            return;
        } catch (err) {
            console.error(err);
            alert("Error al hacer login");
            navigate("/login");
            return;
        }
    };

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
                            onClick={handleRole}
                            type="button" 
                            value="Registrarse" 
                            />
                        </div>
                    </div>
                    <div className="form-information">
                        <div className="form-information-childs">
                            <span onClick={() => navigate('/')} className="btn-cancelar"><i class="fa-solid fa-xmark"></i></span>
                            <h2>Iniciar Sesión</h2>
                            <div className="icons">
                                <i className="fa-brands fa-google"></i>
                                <i className="fa-brands fa-facebook"></i>
                                <i className="fa-brands fa-linkedin"></i>
                                <i className="fa-brands fa-apple"></i>
                            </div>
                            <p>O Inicia Sesión con una cuenta</p>
                            <form onSubmit={handleSubmit}>
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
                                <label>
                                    <i className="fa-solid fa-lock"></i>
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
                                    className="rd-type-role"
                                    type="radio"
                                    name="role"
                                    id="user"
                                    value="user"
                                    checked={userRole === "user"}
                                    onChange={handleRoleChange}
                                />
                                <i className="fa-solid fa-circle-user"></i>
                                <input
                                    className="rd-type-role"
                                    type="radio"
                                    name="role"
                                    id="company"
                                    value="company"
                                    onChange={handleRoleChange}
                                    cheched={userRole === "company"}
                                />
                                <i className="fa-solid fa-briefcase"></i>
                                <br />
                                <input
                                    className="btn-register"
                                    type="submit"
                                    value="Login"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
