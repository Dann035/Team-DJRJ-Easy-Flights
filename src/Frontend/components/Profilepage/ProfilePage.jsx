import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profilepage.css";

const url = import.meta.env.VITE_BACKEND_URL;


function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  

useEffect(() => {
  if (token) {
    fetch(`${url}/api/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (resp) => {
        if (!resp.ok) {
          const errorData = await resp.json();
          throw new Error(errorData.msg || "Error desconocido");
        }
        return resp.json();
      })
      .then((data) => {
        if (data.profile) {
          setUser(data.profile);
          setFormData({
            name: data.profile.name,
            email: data.profile.email,
            password: "",
          });
        } else {
          throw new Error("Perfil no disponible");
        }
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
        alert(err.message);  // Muestra el error al usuario en un mensaje
        navigate("/login");  // Redirige si no puede obtener el perfil
      });
  }
}, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${url}/api/profile/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar perfil");
        return res.json();
      })
      .then((data) => {
        alert("Perfil actualizado con éxito");
        setUser(data.user);
        setFormData((prev) => ({ ...prev, password: "" }));
      })
      .catch((err) => {
        console.error("Error al actualizar perfil:", err);
      });
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h2>Mi Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nueva contraseña (opcional):</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar perfil</button>
      </form>
    </div>
  );
}

export default ProfilePage;