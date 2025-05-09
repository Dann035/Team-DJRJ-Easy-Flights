import React, { useState } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./PaymentPage.css";

function PaymentPage() {
  const [form, setForm] = useState({
    cardNumber: "",
    cardholderName: "",
    cvv: "",
    expirationDate: "",
    paymentMethods: [], // Ahora es un array para manejar varios métodos
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      paymentMethods: checked
        ? [...prev.paymentMethods, value]
        : prev.paymentMethods.filter((method) => method !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!form.cardNumber) formErrors.cardNumber = "El número de tarjeta es obligatorio.";
    if (!form.cardholderName) formErrors.cardholderName = "El nombre del titular es obligatorio.";
    if (!form.cvv) formErrors.cvv = "El CVV es obligatorio.";
    if (!form.expirationDate) formErrors.expirationDate = "La fecha de expiración es obligatoria.";
    if (form.paymentMethods.length === 0)
      formErrors.paymentMethods = "Debes seleccionar al menos un método de pago.";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      alert("Pago procesado correctamente");
    }
  };

  return (
    <div className="payment-container">
      <h2>Formulario de Pago</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Número de tarjeta</label>
          <input
            id="cardNumber"
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9876 5432"
            className="form-control"
          />
          {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cardholderName">Nombre del titular</label>
          <input
            id="cardholderName"
            type="text"
            name="cardholderName"
            value={form.cardholderName}
            onChange={handleChange}
            placeholder="Nombre del titular"
            className="form-control"
          />
          {errors.cardholderName && <span className="error-text">{errors.cardholderName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="password"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            placeholder="CVV"
            className="form-control"
          />
          {errors.cvv && <span className="error-text">{errors.cvv}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Fecha de expiración</label>
          <input
            id="expirationDate"
            type="text"
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
            maxLength="5"  // Limitar a 5 caracteres (MM/YY)
            placeholder="MM/YY"
            className="form-control"
          />
          {errors.expirationDate && <span className="error-text">{errors.expirationDate}</span>}
        </div>

        {/* Métodos de pago: iconos alineados horizontalmente */}
        <div className="payment-methods">
          <div className="payment-icon" title="Visa">
            <i className="fab fa-cc-visa"></i>
          </div>
          <div className="payment-icon" title="Mastercard">
            <i className="fab fa-cc-mastercard"></i>
          </div>
          <div className="payment-icon" title="Apple Pay">
            <i className="fab fa-apple"></i>
          </div>
          <div className="payment-icon" title="Google Pay">
            <i className="fab fa-google-pay"></i>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Procesar pago
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;