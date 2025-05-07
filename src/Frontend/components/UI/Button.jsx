import React from 'react';
import './Button.css';

/**
 * Componente de botón personalizado con múltiples variantes y efectos
 * @param {Object} props - Propiedades del componente
 * @param {string} props.variant - Variante del botón (primary, secondary, outline, glass)
 * @param {string} props.size - Tamaño del botón (sm, md, lg)
 * @param {boolean} props.fullWidth - Si el botón ocupa todo el ancho disponible
 * @param {boolean} props.rounded - Si el botón tiene bordes completamente redondeados
 * @param {boolean} props.animated - Si el botón tiene animación de hover
 * @param {string} props.icon - Nombre del icono (requiere importar FontAwesome o similar)
 * @param {Function} props.onClick - Función para manejar el evento click
 * @param {ReactNode} props.children - Contenido del botón
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  rounded = false,
  animated = false,
  icon,
  disabled = false,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = [
    'custom-button',
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? 'button-full-width' : '',
    rounded ? 'button-rounded' : '',
    animated ? 'button-animated' : '',
    disabled ? 'button-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      <span className="button-content">
        {icon && <i className={`button-icon ${icon}`}></i>}
        {children}
      </span>
      {animated && <span className="button-animation-overlay"></span>}
    </button>
  );
};

export default Button;