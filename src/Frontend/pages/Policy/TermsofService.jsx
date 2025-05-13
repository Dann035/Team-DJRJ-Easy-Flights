import React, { useState } from "react";
import "./TermsofService.css"; // Asegúrate de que este archivo CSS esté correctamente importado

export default function TermsofService() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="container my-5 px-3" style={{ maxWidth: '800px' }}>
      <h1 className="mb-4 text-center">Términos de Servicio</h1>

      <p>Bienvenido a EasyFlights. Al acceder y utilizar nuestro sitio web, aceptas estar sujeto a los siguientes Términos de Servicio. Si no estás de acuerdo, por favor no utilices la plataforma.</p>

      <div className="term-item">
        <div className="term-question" onClick={() => toggleSection(0)}>
          <h4>1. Uso del Sitio</h4>
        </div>
        <div className={`term-answer ${activeSection === 0 ? 'show' : ''}`}>
            <p>EasyFlights proporciona herramientas digitales para la planificación de viajes. Te comprometes a utilizar el sitio de manera legal y respetuosa.</p>
          </div>
        
      </div>

      <div className="term-item">
        <div className="term-question" onClick={() => toggleSection(1)}>
          <h4>2. Registro y Seguridad</h4>
        </div>
        <div className={`term-answer ${activeSection === 1 ? 'show' : ''}`}>
            <p>Si creas una cuenta, debes proporcionar información veraz y mantener segura tu contraseña. Eres responsable de cualquier actividad realizada desde tu cuenta.</p>
          </div>
        
      </div>

      <div className="term-item">
        <div className="term-question" onClick={() => toggleSection(2)}>
          <h4>3. Contenido de Terceros</h4>
        </div>
        <div className={`term-answer ${activeSection === 2 ? 'show' : ''}`}>
            <p>Mostramos enlaces e información de sitios externos. EasyFlights no es responsable del contenido ni de la seguridad de dichos sitios.</p>
          </div>
        
      </div>

      <div className="term-item">
        <div className="term-question" onClick={() => toggleSection(3)}>
          <h4>4. Limitación de Responsabilidad</h4>
        </div>
        <div className={`term-answer ${activeSection === 3 ? 'show' : ''}`}>
            <p>EasyFlights no gestiona reservas ni garantiza la exactitud de los datos. No nos hacemos responsables por pérdidas derivadas del uso del sitio.</p>
          </div>
        
      </div>

      <div className="term-item">
        <div className="term-question" onClick={() => toggleSection(4)}>
          <h4>5. Modificaciones</h4>
        </div>
       <div className={`term-answer ${activeSection === 4 ? 'show' : ''}`}>
            <p>Podemos actualizar estos términos en cualquier momento. Las modificaciones entrarán en vigor al ser publicadas aquí.</p>
          </div>
        
      </div>

      <div className="term-item">
        <div className="term-question" onClick={() => toggleSection(5)}>
          <h4>6. Contacto</h4>
        </div>
        <div className={`term-answer ${activeSection === 5 ? 'show' : ''}`}>
            <p>Para consultas, contáctanos en: <a href="mailto:contacto@easyflights.com">contacto@easyflights.com</a></p>
          </div>
        
      </div>

      <span><strong>Última actualización:</strong> 7 de mayo de 2025</span>
    </div>
  );
}