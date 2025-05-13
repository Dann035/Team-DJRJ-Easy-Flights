import React, { useState } from 'react';
import './Faqs.css';

const faqs = [
  {
    question: '¿Cómo puedo buscar vuelos?',
    answer:
      'Puedes buscar vuelos desde la página principal seleccionando tu destino entre los 8 disponibles, junto con la fecha de salida y regreso. Luego, se te mostrarán las opciones disponibles de vuelos y paquetes relacionados.',
    detailedAnswer:
      'Además de los destinos, puedes filtrar por fechas y duración del viaje. Puedes elegir entre vuelos directos o con escalas, y también ver diferentes opciones de precios según la clase de vuelo.',
  },
  {
    question: '¿Qué incluyen los paquetes de viaje?',
    answer:
      'Los paquetes incluyen vuelo, alojamiento y, en algunos casos, actividades turísticas. La duración y destino están predeterminados, pero puedes seleccionar las fechas disponibles.',
    detailedAnswer:
      'Los paquetes están diseñados para ofrecerte la mejor experiencia de viaje, ahorrándote tiempo y esfuerzo en la planificación. Puedes personalizar el paquete seleccionando tus fechas de viaje preferidas.',
  },
  {
    question: '¿Necesito estar registrado para reservar?',
    answer:
      'Sí, necesitas tener una cuenta para acceder a la reserva de vuelos y paquetes, así como para usar herramientas adicionales como el calculador de presupuesto.',
    detailedAnswer:
      'Registrarte te permitirá acceder a todas las funcionalidades exclusivas, incluyendo la gestión de tus reservas, seguimiento de tu historial de viajes y el uso de herramientas interactivas como la división de gastos grupales.',
  },
  {
    question: '¿Qué hace la herramienta para calcular presupuesto?',
    answer:
      'Esta herramienta te permite estimar el costo total de tu viaje incluyendo vuelo, hospedaje, comida y actividades, según tus preferencias y duración del viaje.',
    detailedAnswer:
      'El calculador utiliza datos en tiempo real de precios para ofrecerte una estimación precisa. También puedes ajustar las variables como el tipo de alojamiento, transporte y actividades para ver diferentes opciones de presupuesto.',
  },
  {
    question: '¿Cómo funciona la división de gastos grupales?',
    answer:
      'Puedes crear un grupo de viaje e ingresar los gastos compartidos. La herramienta calcula automáticamente cuánto debe pagar cada miembro y guarda un historial.',
    detailedAnswer:
      'La herramienta te permite llevar un control de todos los gastos del grupo, ya sea en una sola moneda o en varias, y genera un resumen detallado de cuánto debe aportar cada persona, basándose en lo que ya haya pagado cada uno.',
  },
  {
    question: '¿Dónde puedo ver mi historial de viajes y gastos?',
    answer:
      'En tu perfil de usuario puedes acceder al historial de paquetes reservados, presupuestos calculados y gastos grupales registrados.',
    detailedAnswer:
      'Dentro del historial podrás ver un desglose completo de cada viaje que has realizado, los presupuestos creados y el registro de tus gastos divididos con el grupo. Además, podrás descargar un informe si lo necesitas.',
  },
  {
    question: '¿Puedo cambiar mis fechas de viaje una vez reservado?',
    answer:
      'Depende del paquete o vuelo reservado. Algunos permiten cambios con anticipación, otros no. Revisa los detalles específicos al momento de reservar.',
    detailedAnswer:
      'Algunos paquetes de viaje y vuelos ofrecen flexibilidad para cambiar las fechas, pero esto puede estar sujeto a cargos adicionales. Te recomendamos revisar las políticas de cambio al momento de realizar la reserva.',
  },
  {
    question: '¿Qué hago si tengo problemas con mi cuenta?',
    answer:
      'Puedes contactar al soporte desde tu perfil o mediante el formulario de contacto disponible en la sección de ayuda.',
    detailedAnswer:
      'Si tienes problemas técnicos o dudas sobre tu cuenta, nuestro equipo de soporte está disponible para ayudarte a resolver cualquier inconveniente. Puedes enviar un mensaje o realizar una llamada a nuestro centro de atención al cliente.',
  },
];

const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <h1>FAQs</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-question"
            onClick={() => handleClick(index)}
          >
            <h3>{faq.question}</h3>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
              <p><strong>Detalles:</strong> {faq.detailedAnswer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQS;