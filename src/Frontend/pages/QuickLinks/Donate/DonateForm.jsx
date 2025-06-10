import React, { useState } from 'react';
import './DonateForm.css';

const DonateForm = () => {
  const [form, setForm] = useState({
    metodoPago: '',
    anonimo: false,
    nombre: '',
    monto: '',
    titular: '',
    tarjeta: '',
    vencimiento: '',
    cvv: '',
    comentario: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue = value;

    if (name === 'tarjeta') {
      // Formatear número de tarjeta en bloques de 4
      newValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();
    }


    
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue,
    }));
  };

  const handleMetodoPago = (metodo) => {
    setForm((prev) => ({
      ...prev,
      metodoPago: metodo,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleRedirectToPayPal = () => {
    // Simulación de redirección a PayPal
    window.open('https://www.paypal.com/signin', '_blank');
    setSubmitted(true);
  };

  return (
    <div className="donateform-container">
      <h1>Formulario de Donación</h1>

      {submitted ? (
        <div className="confirmation">
    <h2>¡Gracias por tu donación!</h2>
    <p>Resguardo de tu aporte:</p>

    <div className="receipt-card">
      {!form.anonimo && (
        <p><strong>Nombre:</strong> {form.nombre}</p>
      )}
      <p><strong>Monto:</strong> ${form.monto}</p>
      {form.comentario && (
        <p><strong>Comentario:</strong> {form.comentario}</p>
      )}
    </div>
  </div>
      ) : (
        <>
          {!form.metodoPago ? (
            <div className="payment-method-select">
              <p>Elige tu método de pago:</p>
              <button onClick={() => handleMetodoPago('paypal')}>PayPal</button>
              <button onClick={() => handleMetodoPago('tarjeta')}>Tarjeta de crédito</button>
            </div>
          ) : form.metodoPago === 'paypal' ? (
            <div className="paypal-login">
              <h3>Inicia sesión en PayPal</h3>
              <button className="btn paybutton" onClick={handleRedirectToPayPal}>
                Ir a PayPal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                ¿Quieres donar de forma anónima?
                <input
                  type="checkbox"
                  name="anonimo"
                  checked={form.anonimo}
                  onChange={handleChange}
                />
              </label>

              <label>
                Monto a donar (USD):
                <input
                  type="number"
                  name="monto"
                  min="1"
                  value={form.monto}
                  onChange={handleChange}
                  required
                />
              </label>

              {!form.anonimo && (
  <label>
    Nombre completo:
    <input
      type="text"
      name="nombre"
      value={form.nombre}
      onChange={handleChange}
      required
    />
  </label>
)}

<label>
  Nombre del titular de la tarjeta:
  <input
    type="text"
    name="titular"
    value={form.titular}
    onChange={handleChange}
    required
  />
</label>

              <label>
                Número de tarjeta:
                <input
                  type="text"
                  name="tarjeta"
                  value={form.tarjeta}
                  onChange={handleChange}
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </label>

              <label>
                Fecha de vencimiento (MM/AA):
                <input
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength="5"
            
          />
              </label>

              <label>
                CVV:
                <input
                  type="password"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  maxLength="4"
                  required
                />
              </label>

              <label>
                Comentarios u observaciones:
                <textarea
                  name="comentario"
                  value={form.comentario}
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="btn paybutton">Donar</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default DonateForm;