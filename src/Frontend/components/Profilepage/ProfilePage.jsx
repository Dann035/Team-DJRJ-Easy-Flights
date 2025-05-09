import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profilepage.css";

const url = import.meta.env.VITE_BACKEND_URL;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
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
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          } else {
            throw new Error("Perfil no disponible");
          }
        })
        .catch((err) => {
          console.error("Error al obtener perfil:", err);
          alert(err.message);
          navigate("/login");
        });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validar contraseñas solo si se están cambiando
    if (showPasswordFields) {
      if (!formData.currentPassword) {
        validationErrors.currentPassword = "La contraseña actual es obligatoria.";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        validationErrors.confirmPassword = "Las contraseñas no coinciden.";
      }
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const dataToSubmit = {
      name: formData.name,
    };

    if (showPasswordFields) {
      dataToSubmit.password = formData.newPassword;
      dataToSubmit.currentPassword = formData.currentPassword;
    }

    fetch(`${url}/api/profile/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.msg || "Error al actualizar perfil");
        }
        return res.json();
      })
      .then((data) => {
        alert("Perfil actualizado con éxito");
        setUser(data.user);
        setIsEditing(false);
        setShowPasswordFields(false);
        setFormData({
          name: data.user.name,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.error("Error al actualizar perfil:", err);
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Contraseña actual incorrecta",
        }));
      });
  };

  if (!user) {
    return (
      <div className="profile-container">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Boarding Pass</h2>
      </div>

      {!isEditing ? (
        <div className="user-profile-info">
          <div>
            <label>Nombre:</label>
            <p>{user.name}</p>
          </div>
          <div>
            <label>Correo electrónico:</label>
            <p>{user.email}</p>
          </div>
          <button classname="edit" onClick={() => setIsEditing(true)}>Editar información</button>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {!showPasswordFields ? (
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowPasswordFields(true)}
            >
              Cambiar contraseña
            </button>
          ) : (
            <>
              <hr />
              <h4>Cambiar contraseña</h4>

              <div>
                <label htmlFor="currentPassword">Contraseña actual:</label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
                {errors.currentPassword && (
                  <span className="error-text">{errors.currentPassword}</span>
                )}
              </div>
              <div>
                <label htmlFor="newPassword">Nueva contraseña:</label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            </>
          )}

          <button type="submit">Actualizar perfil</button>
          <button
  type="button"
  className="cancel-button"
  onClick={() => {
    setIsEditing(false);
    setShowPasswordFields(false);
    setErrors({});
  }}
>
  Cancelar
</button>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;