import React, { useEffect, useState } from "react";
import "./UserProfile.css";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
        const token = localStorage.getItem("access_token");
      
        if (!token) {
          setError("Token no disponible");
          setLoading(false);
          return;
        }
      
        try {
          const response = await fetch(`${API_URL}/user/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener perfil");
          }
      
          const data = await response.json();
          setUser(data.user);
        } catch (err) {
          console.error("Error al obtener perfil:", err)
          setError("No se pudo cargar la información del perfil.");
        } finally {
          setLoading(false);
        }
      };

    fetchUserProfile();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile">
      <h2>Perfil de Usuario</h2>
      <div className="profile-card">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.roles.join(", ")}</p>
      </div>
    </div>
  );
};

export default UserProfile;