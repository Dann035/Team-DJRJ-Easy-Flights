import React from "react";

export default function UserConsent() {
  return (
    <div className="container my-5 px-3" style={{ maxWidth: '800px' }}>
      <h1 className="mb-4 text-center">Política de Cookies</h1>
      
      <p>EasyFlights utiliza cookies para mejorar tu experiencia de navegación, personalizar contenido y analizar nuestro tráfico. Al continuar navegando en nuestro sitio, aceptas el uso de cookies conforme a esta política.</p>

      <h4>1. ¿Qué son las cookies?</h4>
      <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten recordar tus preferencias y mejorar la funcionalidad del sitio.</p>

      <h4>2. ¿Qué tipos de cookies utilizamos?</h4>
      <ul>
        <li><strong>Cookies necesarias:</strong> esenciales para el funcionamiento del sitio.</li>
        <li><strong>Cookies de análisis:</strong> nos ayudan a entender cómo interactúan los usuarios con la plataforma.</li>
        <li><strong>Cookies de funcionalidad:</strong> almacenan tus preferencias, como el idioma o configuración de herramientas.</li>
      </ul>

      <h4>3. Gestión de cookies</h4>
      <p>Puedes gestionar o eliminar las cookies desde la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.</p>

      <h4>4. Cambios en esta política</h4>
      <p>Nos reservamos el derecho de modificar esta política de cookies. Cualquier cambio será comunicado en esta página.</p>

      <p><strong>Última actualización:</strong> 7 de mayo de 2025</p>

    </div>
  );
}