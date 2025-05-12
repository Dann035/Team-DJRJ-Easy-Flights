import React from "react";
import "./Instagram.css"; // Asegúrate de tener el CSS abajo

const imageUrls = [
  "public/bcn-casi-general.jpg",
  "public/tokyo-lifestyle-arquitectura-elh.webp",
  "public/emiratos-blog.webp",
  "public/eiffel.webp",
  "public/singapore_final_cover.webp",
  "public/roma_d59824b1_250226111509_1280x.webp",
];

export default function Instagram() {
  return (
    <div className="ig-profile-container">
      <div className="ig-header">
        <div className="ig-avatar">
          <img src="Icono-Posible.png" alt="EasyFlights Logo" />
        </div>
        <div className="ig-user-info">
          <div className="ig-username-section">
            <h2>easyflights</h2>
            <button className="ig-follow-button">Seguir</button>
          </div>
          <div className="ig-stats">
            <span><strong>50</strong> publicaciones</span>
            <span><strong>200k</strong> seguidores</span>
            <span><strong>200</strong> siguiendo</span>
          </div>
          <div className="ig-description">
            ✈️ EasyFlights - Vuela fácil<br />
            Explora destinos, crea presupuestos y divide gastos con amigos.<br />
            🌍 ¡Tu próxima aventura comienza aquí!
          </div>
        </div>
      </div>

      <hr />

      <div className="ig-gallery">
  {imageUrls.map((url, index) => (
    <div className="ig-photo" key={index}>
      <img src={url} alt={`Post ${index + 1}`} />
    </div>
  ))}
</div>
    </div>
  );
}