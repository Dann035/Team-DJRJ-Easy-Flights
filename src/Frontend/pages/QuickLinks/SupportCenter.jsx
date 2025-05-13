import React, { useState } from 'react';
import './SupportCenter.css'; // Agrega estilos adicionales si es necesario

const SupportCenter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setStatusMessage('Gracias por tu mensaje, nos pondremos en contacto contigo pronto.');
    
    // Limpiar formulario
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="support-center">
      <h1>Centro de Soporte</h1>
      <p>¿Tienes alguna pregunta o necesitas asistencia? ¡Estamos aquí para ayudarte!</p>
      
      <section className="support-info">
        <h2>Opciones de Soporte</h2>
        <ul>
          <li><a href="/faqs">Consulta nuestras Preguntas Frecuentes (FAQs)</a></li>
          <li><a href="mailto:support@tusitio.com">Envíanos un correo electrónico a support@tusitio.com</a></li>
          <li><a href="tel:+1234567890">Llama a nuestro número de soporte: +123 456 7890</a></li>
        </ul>
      </section>

      <section className="contact-form">
        <h2>Formulario de Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </section>
      
    </div>
  );
};

export default SupportCenter;