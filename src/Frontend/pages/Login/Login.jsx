import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                console.error(res.statusText);
            }
            localStorage.setItem("access_token", data.token);
            alert("Login correcto");
            navigate("/home");
            return;
        } catch (err) {
            console.error(err);
            alert("Error al hacer login");
            navigate("/");
            return;
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        value={formData.email}
                        type="email"
                        name="email"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        value={formData.password}
                        type="password"
                        name="password"
                        required
                    />
                </fieldset>
                <fieldset className="d-flex align-items-center justify-content-center">
                    <fieldset className="d-flex flex-column me-4 text-center">
                        <span>Role: </span>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <fieldset className="d-flex align-items-center justify-content-center">
                                <input
                                    onChange={handleRoleChange}
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={userRole === "user"}
                                />
                                <label htmlFor="role">User</label>
                            </fieldset>
                            <fieldset className="d-flex align-items-center justify-content-center">
                                <input
                                    onChange={handleRoleChange}
                                    type="radio"
                                    name="role"
                                    value="company"
                                    checked={userRole === "company"}
                                />
                                <label htmlFor="role">Company</label>
                            </fieldset>
                        </div>
                    </fieldset>
                    <button type="submit">Login</button>
                    {}
                    <button onClick={handleRole} type="button">
                        Register
                    </button>
                    <button type="reset">Reset</button>
                </fieldset>
            </form>
        </>
    );
}

export default Login;
