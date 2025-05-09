import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Archivos de traducción
const resources = {
  en: {
    translation: {
      // Navbar
    home: "Home",
    flights: "Flights",
    offers: "Offers",
    contact: "Contact",
    travelTools: "Herramientas de Viajes",
    travelTips: "Tips de Viaje",
    login: "Login",
    logout: "Logout",
    
    // Secciones comunes
    searchFlights: "Search Flights",
    origin: "Origin",
    destination: "Destination",
    departureDate: "Departure Date",
    returnDate: "Return Date",
    passengers: "Passengers",
    search: "Search",
    
    // Ofertas
    specialOffers: "Special Offers",
    viewOffer: "View Offer",
    
    // Features
    ourFeatures: "Our Features",
    bestPrices: "Best Prices",
    easyBooking: "Easy Booking",
    support24h: "24/7 Support",
    
    // Comentarios
    customerReviews: "Customer Reviews",
    readMore: "Read More",
    
    // Footer
    aboutUs: "About Us",
    termsConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    followUs: "Follow Us",
    allRightsReserved: "All Rights Reserved"
    }
  },
  es: {
    translation: {
      // Navbar
    home: "Inicio",
    flights: "Vuelos",
    offers: "Ofertas",
    contact: "Contacto",
    travelTools: "Herramientas de Viajes",
    travelTips: "Tips de Viaje",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    
    // Secciones comunes
    searchFlights: "Buscar Vuelos",
    origin: "Origen",
    destination: "Destino",
    departureDate: "Fecha de Salida",
    returnDate: "Fecha de Regreso",
    passengers: "Pasajeros",
    search: "Buscar",
    
    // Ofertas
    specialOffers: "Ofertas Especiales",
    viewOffer: "Ver Oferta",
    
    // Features
    ourFeatures: "Nuestras Características",
    bestPrices: "Mejores Precios",
    easyBooking: "Reserva Fácil",
    support24h: "Soporte 24/7",
    
    // Comentarios
    customerReviews: "Opiniones de Clientes",
    readMore: "Leer Más",
    
    // Footer
    aboutUs: "Sobre Nosotros",
    termsConditions: "Términos y Condiciones",
    privacyPolicy: "Política de Privacidad",
    followUs: "Síguenos",
    allRightsReserved: "Todos los Derechos Reservados"
    }
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasa i18n a react-i18next
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto
    interpolation: {
      escapeValue: false, // No es necesario para React
    },
    react: {
      useSuspense: false, // Evita problemas con suspense
    }
  });

export default i18n;