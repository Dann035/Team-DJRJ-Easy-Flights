import React, { useState } from "react";
import "./PaymentPage.css";

function PaymentPage() {
  const [form, setForm] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
    paymentMethod: "visa",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Pago procesado con éxito!");
    // Aquí podrías hacer fetch a una API o redirigir
  };

  return (
    <div className="payment-container">
      <h2>Detalles de pago</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="payment-methods">
          <label>Selecciona método de pago</label>
          <div className="payment-icons">
            <input
              type="radio"
              id="visa"
              name="paymentMethod"
              value="visa"
              checked={form.paymentMethod === "visa"}
              onChange={handleChange}
            />
            <label htmlFor="visa">
              <i className="payment-icon visa"></i>
            </label>

            <input
              type="radio"
              id="mastercard"
              name="paymentMethod"
              value="mastercard"
              checked={form.paymentMethod === "mastercard"}
              onChange={handleChange}
            />
            <label htmlFor="mastercard">
              <i className="payment-icon mastercard"></i>
            </label>

            <input
              type="radio"
              id="applepay"
              name="paymentMethod"
              value="applepay"
              checked={form.paymentMethod === "applepay"}
              onChange={handleChange}
            />
            <label htmlFor="applepay">
              <i className="payment-icon applepay"></i>
            </label>

            <input
              type="radio"
              id="googlepay"
              name="paymentMethod"
              value="googlepay"
              checked={form.paymentMethod === "googlepay"}
              onChange={handleChange}
            />
            <label htmlFor="googlepay">
              <i className="payment-icon googlepay"></i>
            </label>
          </div>
        </div>

        <div>
          <label>Número de tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            maxLength={16}
            value={form.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre del titular</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de expiración</label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/AA"
            value={form.expiry}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            maxLength={4}
            value={form.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="pay-button">
          Pagar
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;