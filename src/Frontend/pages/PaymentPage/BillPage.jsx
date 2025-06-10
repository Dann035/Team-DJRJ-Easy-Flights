import React from "react";
import { useLocation } from "react-router-dom";
import "./BillPage.css";
import { MapPin, Calendar } from "lucide-react";

const BillPage = () => {
  const { state } = useLocation();

  if (!state?.offer || !state?.payment) {
    return <p>No se encontró información de la oferta o el pago.</p>;
  }

  const { offer, payment } = state;

  // Si tienes los últimos 4 dígitos, úsalos, si no, muestra "No disponible"
  const last4 = payment.cardNumber
    ? `**** **** **** ${payment.cardNumber.slice(-4)}`
    : "No disponible";

  return (
    <div className="bill-container">
      <h2>Resumen de la factura</h2>
      <div className="bill-details">
        <h3>Datos de la Oferta</h3>
        <div className="offer-img-container">
          <img src={offer.image_url} alt={offer.title} className="offer-img" />
        </div>
        <p><strong>Título:</strong> {offer.title}</p>
        <p><strong>Descripción:</strong> {offer.description}</p>
        <p><strong>Duración:</strong> {offer.duration}</p>
        <p><strong>Precio:</strong> €{offer.price}</p>
        
        <h3>Datos del Pago</h3>
        <p><strong>Nombre del titular:</strong> {payment.cardholderName || "No disponible"}</p>
        <p><strong>Método de pago:</strong> {payment.paymentMethod || "No disponible"}</p>
        <p><strong>Tarjeta:</strong> {last4}</p>
        <h3>Total: €{offer.price}</h3>

        <button className="print" onClick={() => window.print()}>Imprimir factura</button>
      </div>
    </div>
  );
};

export default BillPage;