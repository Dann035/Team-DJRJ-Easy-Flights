import React from "react";
import { useLocation } from "react-router-dom";

const BillAPI = () => {
  const location = useLocation();
  const { payment } = location.state || {};

  return (
    <div className="bill-container">
      <h2>Factura de Pago</h2>
      <p><strong>ID de pago:</strong> {payment ? payment.cardNumber : "N/A"}</p>
      <p><strong>Nombre del titular:</strong> {payment?.cardholderName}</p>
      <p><strong>Metodo de pago:</strong> {payment?.paymentMethod}</p>
      <p><strong>Precio:</strong> {payment?.price || "N/A"}</p>
    </div>
  );
};

export default BillAPI;
