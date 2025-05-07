import React, { useState } from "react";
import NotificationModal from "../components/NotificationModal/NotificationModal";

const NotificationModalExample = () => {
  // Estados para controlar la visibilidad de cada tipo de notificación
  const [showInfo, setShowInfo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  // Función para mostrar una notificación
  const showNotification = (type) => {
    switch (type) {
      case "info":
        setShowInfo(true);
        break;
      case "success":
        setShowSuccess(true);
        break;
      case "warning":
        setShowWarning(true);
        break;
      case "error":
        setShowError(true);
        break;
      case "custom":
        setShowCustom(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ejemplos de Notificaciones</h2>
      
      <div className="d-flex flex-wrap gap-3 mt-4">
        <button 
          className="btn btn-info" 
          onClick={() => showNotification("info")}
        >
          Mostrar Info
        </button>
        
        <button 
          className="btn btn-success" 
          onClick={() => showNotification("success")}
        >
          Mostrar Éxito
        </button>
        
        <button 
          className="btn btn-warning" 
          onClick={() => showNotification("warning")}
        >
          Mostrar Advertencia
        </button>
        
        <button 
          className="btn btn-danger" 
          onClick={() => showNotification("error")}
        >
          Mostrar Error
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={() => showNotification("custom")}
        >
          Notificación Personalizada
        </button>
      </div>

      {/* Notificación de información */}
      <NotificationModal
        text="Esta es una notificación informativa"
        show={showInfo}
        onClose={() => setShowInfo(false)}
        type="info"
        duration={3000}
        position="top-right"
      />

      {/* Notificación de éxito */}
      <NotificationModal
        text="¡Operación completada con éxito!"
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="success"
        duration={3000}
        position="top-center"
      />

      {/* Notificación de advertencia */}
      <NotificationModal
        text="Atención: Esta acción requiere confirmación"
        show={showWarning}
        onClose={() => setShowWarning(false)}
        type="warning"
        duration={4000}
        position="bottom-right"
      />

      {/* Notificación de error */}
      <NotificationModal
        text="Ha ocurrido un error al procesar tu solicitud"
        show={showError}
        onClose={() => setShowError(false)}
        type="error"
        duration={5000}
        position="bottom-center"
      />

      {/* Notificación personalizada */}
      <NotificationModal
        text="Esta notificación permanecerá hasta que la cierres manualmente"
        show={showCustom}
        onClose={() => setShowCustom(false)}
        type="info"
        duration={0} // No se cierra automáticamente
        position="top-left"
      />
    </div>
  );
};

export default NotificationModalExample;