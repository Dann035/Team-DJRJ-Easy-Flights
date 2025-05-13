import React, { useState } from "react";
import "./PolicyInfo.css"; // Asegúrate de tener este CSS creado

export default function PolicyInfo() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="container my-5 px-3" style={{ maxWidth: '800px' }}>
      <h1 className="mb-4 text-center">Política de Privacidad</h1>

      <p>
        En EasyFlights valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal cuando usas nuestra plataforma.
      </p>

      <div className="policy-item">
        <div className="policy-question" onClick={() => toggleSection(0)}>
          <h4>1. Información que Recopilamos</h4>
        </div>
        <div className={`policy-answer ${activeSection === 0 ? 'show' : ''}`}>
            <p>Podemos recopilar información como tu nombre, correo electrónico, preferencias de viaje y datos ingresados en herramientas como el planificador de presupuestos.</p>
          </div>
        
      </div>

      <div className="policy-item">
        <div className="policy-question" onClick={() => toggleSection(1)}>
          <h4>2. Uso de la Información</h4>
        </div>
        <div className={`policy-answer ${activeSection === 1 ? 'show' : ''}`}>
            <p>Usamos tus datos para ofrecerte una mejor experiencia, mejorar nuestras herramientas y comunicarnos contigo sobre actualizaciones o asistencia.</p>
          </div>
        
      </div>

      <div className="policy-item">
        <div className="policy-question" onClick={() => toggleSection(2)}>
          <h4>3. Almacenamiento y Seguridad</h4>
        </div>
       <div className={`policy-answer ${activeSection === 2 ? 'show' : ''}`}>
            <p>Tu información se almacena de forma segura. Implementamos medidas técnicas para protegerla contra accesos no autorizados.</p>
          </div>
        
      </div>

      <div className="policy-item">
        <div className="policy-question" onClick={() => toggleSection(3)}>
          <h4>4. Compartir con Terceros</h4>
        </div>
        <div className={`policy-answer ${activeSection === 3 ? 'show' : ''}`}>
            <p>No vendemos ni compartimos tu información personal con terceros, excepto cuando es necesario para el funcionamiento del servicio (como enlaces externos a sitios turísticos).</p>
          </div>
        
      </div>

      <div className="policy-item">
        <div className="policy-question" onClick={() => toggleSection(4)}>
          <h4>5. Tus Derechos</h4>
        </div>
        <div className={`policy-answer ${activeSection === 4 ? 'show' : ''}`}>
            <p>Puedes solicitar acceso, corrección o eliminación de tus datos personales escribiéndonos a <a href="mailto:contacto@easyflights.com">contacto@easyflights.com</a>.</p>
          </div>
        
      </div>

      <div className="policy-item">
        <div className="policy-question" onClick={() => toggleSection(5)}>
          <h4>6. Cambios en la Política</h4>
        </div>
        <div className={`policy-answer ${activeSection === 5 ? 'show' : ''}`}>
            <p>Nos reservamos el derecho de actualizar esta política. Cualquier cambio será publicado en esta página.</p>
          </div>
        
      </div>

      <p><strong>Última actualización:</strong> 7 de mayo de 2025</p>
    </div>
  );
}