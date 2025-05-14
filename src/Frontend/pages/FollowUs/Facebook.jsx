import React from "react";
import "./Facebook.css"; // Asegúrate de crear este archivo

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // playa
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff", // avión
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98", // ciudad
];

export default function Facebook() {
  return (
    <div className="fb-page-container">
      <div className="fb-cover-photo">
        <img src="https://store-images.s-microsoft.com/image/apps.35093.9007199266245907.bb486e48-50ee-459a-a4ab-079602cdeaa1.8a3caf66-7e40-4d13-bdb2-1cb91e4a08a1?h=1280" alt="Portada" />
      </div>

      <div className="fb-profile-info">
        <div className="fb-profile-pic">
          <img src="Icono-Posible.png" alt="EasyFlights Logo" />
        </div>
        <div className="fb-page-details">
          <h2>EasyFlights</h2>
          <p>✈️ Agencia de viajes · 4.8 ⭐ · 200k seguidores</p>
          <button className="fb-like-btn">👍 Me gusta</button>
        </div>
      </div>

      <hr />

      {images.map((url, index) => (
  <div className="fb-post" key={index}>
    <div className="fb-post-header">
      <div>
        <strong>EasyFlights</strong>
        {/* fecha para las publcaciones<p>{new Date().toLocaleDateString()}</p>*/}
      </div>
    </div>
    <p>Explora nuevos destinos con nosotros ✈️🌍 #ViajaConEasyFlights</p>
    <img src={url} alt={`Post ${index + 1}`} />
  </div>
))}
    </div>
  );
}