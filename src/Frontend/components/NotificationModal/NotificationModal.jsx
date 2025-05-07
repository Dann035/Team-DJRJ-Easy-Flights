import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import "./NotificationModal.css";

/**
 * Componente de notificación modal reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {string} props.text - Texto a mostrar en la notificación
 * @param {boolean} props.show - Estado que controla si se muestra la notificación
 * @param {function} props.onClose - Función para cerrar la notificación
 * @param {string} props.type - Tipo de notificación: "info", "success", "warning", "error"
 * @param {number} props.duration - Duración en ms antes de que la notificación desaparezca (0 para que no desaparezca)
 * @param {string} props.position - Posición de la notificación: "top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left"
 */
const NotificationModal = ({ 
  text, 
  show = false, 
  onClose, 
  type = "info", 
  duration = 3000,
  position = "top-right" 
}) => {
  const [isVisible, setIsVisible] = useState(show);

  // Determinar el icono según el tipo de notificación
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="notification-icon success" />;
      case "warning":
        return <FaExclamationTriangle className="notification-icon warning" />;
      case "error":
        return <FaTimesCircle className="notification-icon error" />;
      case "info":
      default:
        return <FaInfoCircle className="notification-icon info" />;
    }
  };

  // Efecto para manejar la visibilidad y el cierre automático
  useEffect(() => {
    setIsVisible(show);
    
    let timer;
    if (show && duration > 0) {
      timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show, duration, onClose]);

  // Manejador para cerrar la notificación
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`notification-modal ${type} ${position}`}
          initial={{ opacity: 0, y: position.includes("top") ? -50 : 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: position.includes("right") ? 100 : position.includes("left") ? -100 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="notification-content">
            {getIcon()}
            <p className="notification-text">{text}</p>
          </div>
          <button className="notification-close" onClick={handleClose}>
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;