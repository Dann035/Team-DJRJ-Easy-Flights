import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/api";


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
            navigate('/');
        }catch(err){
            console.error(err);
            alert('Error al registrar el usuario');
            navigate('/');
            return;
        }
    }

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="name">Name :</label>
                    <input onChange={handleChange} value={formData.name} type="text" name="name" id="name" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email :</label>
                    <input onChange={handleChange} value={formData.email} type="email" name="email" id="email" required/>
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password :</label>
                    <input onChange={handleChange} value={formData.password} type="password" name="password" id="password" required/>
                </fieldset>
                <button type="submit">Signup</button>
                <button onClick={()=> navigate('/')} type="button">Ir a Login</button>
            </form>
        </>
    );
}

export default Signup;
