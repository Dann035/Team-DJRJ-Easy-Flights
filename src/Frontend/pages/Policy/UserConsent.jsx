import React, { useState } from "react";
import "./UserConsent.css"; // Crea este archivo con los estilos que te doy abajo

export default function UserConsent() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="container my-5 px-3" style={{ maxWidth: '800px' }}>
      <h1 className="mb-4 text-center">Política de Cookies</h1>

      <p>
        EasyFlights utiliza cookies para mejorar tu experiencia de navegación, personalizar contenido y analizar nuestro tráfico. Al continuar navegando en nuestro sitio, aceptas el uso de cookies conforme a esta política.
      </p>

      <div className="cookie-item">
        <div className="cookie-question" onClick={() => toggleSection(0)}>
          <h4>1. ¿Qué son las cookies?</h4>
        </div>
        <div className={`cookie-answer ${activeSection === 0 ? "show" : ""}`}>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten recordar tus preferencias y mejorar la funcionalidad del sitio.</p>
        </div>
      </div>

      <div className="cookie-item">
        <div className="cookie-question" onClick={() => toggleSection(1)}>
          <h4>2. ¿Qué tipos de cookies utilizamos?</h4>
        </div>
        <div className={`cookie-answer ${activeSection === 1 ? "show" : ""}`}>
          <ul>
            <li><strong>Cookies necesarias:</strong> esenciales para el funcionamiento del sitio.</li>
            <li><strong>Cookies de análisis:</strong> nos ayudan a entender cómo interactúan los usuarios con la plataforma.</li>
            <li><strong>Cookies de funcionalidad:</strong> almacenan tus preferencias, como el idioma o configuración de herramientas.</li>
          </ul>
        </div>
      </div>

      <div className="cookie-item">
        <div className="cookie-question" onClick={() => toggleSection(2)}>
          <h4>3. Gestión de cookies</h4>
        </div>
        <div className={`cookie-answer ${activeSection === 2 ? "show" : ""}`}>
          <p>Puedes gestionar o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.</p>
        </div>
      </div>

      <div className="cookie-item">
        <div className="cookie-question" onClick={() => toggleSection(3)}>
          <h4>4. Cambios en esta política</h4>
        </div>
        <div className={`cookie-answer ${activeSection === 3 ? "show" : ""}`}>
          <p>Nos reservamos el derecho de modificar esta política de cookies. Cualquier cambio será comunicado en esta página.</p>
        </div>
      </div>

      <p><strong>Última actualización:</strong> 7 de mayo de 2025</p>
    </div>
  );
}