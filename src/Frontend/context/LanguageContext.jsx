import React, { createContext, useState, useEffect, useContext } from 'react';

//Traducciones
const translations = {
  en: {
    // Navbar
    home: "Home",
    flights: "Flights",
    offers: "Offers",
    contact: "Contact",
    travelTools: "Travel Tools",
    travelTips: "Travel Tips",
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
    allRightsReserved: "All Rights Reserved",

    // Tagline / Hero
    discoverAdventure: "Discover Your Next",
    aventure: "Adventure",
    heroDescription: "Explore stunning destinations that awaken your wanderlust. Let us guide you to unforgettable experiences and hidden gems around the world.",
    explore: "Explore",
    learnMore: "Learn More",
    findIdealFlight: "Find your ideal flight",
    selectOrigin: "Select origin",
    selectDestination: "Select destination",
    dates: "Dates",
    departurePlaceholder: "Departure date",
    returnPlaceholder: "Return date",
    passengersLabel: "Passengers",
    searchFlightsBtn: "Search Flights",
    pleaseSelectOriginDest: "Please select origin and destination to continue",

    // Destinations (Tagline)
    lasVegas: "Las Vegas",
    lasVegasDesc: "The city that never sleeps",
    newYork: "New York",
    newYorkDesc: "The Big Apple",
    tokyo: "Tokyo",
    tokyoDesc: "Tradition and modernity",
    miami: "Miami",
    miamiDesc: "Beaches and nightlife",
    london: "London",
    londonDesc: "History and culture",
    mexico: "Mexico",
    mexicoDesc: "Gastronomy and color",
    puertoRico: "Puerto Rico",
    puertoRicoDesc: "Caribbean paradise",
    paris: "Paris",
    parisDesc: "The city of love",
    viewDeals: "View Deals",
    viewAllDestinations: "View All Destinations",
    popularDestinations: "Popular Destinations",
    discoverPopular: "Discover our most popular destinations",

    // Login
    welcomeBack: "Welcome back!",
    loginDescription: "Access your account to manage your flights and enjoy a personalized experience.",
    dontHaveAccount: "Don't have an account?",
    register: "Register",
    loginTitle: "Login",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    forgotPassword: "Forgot your password?",
    loginLoading: "Loading...",
    loginSuccess: "Login successful!",
    loginError: "Error logging in. Please try again.",
    fillAllFields: "Please complete all fields",

    // Signup (User)
    signupTitle: "Sign Up",
    signupSuccess: "Registration successful",
    signupError: "Error registering user",
    signupWithGoogle: "Sign up with Google",
    signupWithFacebook: "Sign up with Facebook",
    signupWithLinkedIn: "Sign up with LinkedIn",
    signupWithApple: "Sign up with Apple",
    orSignupAsCompany: "Or sign up as a company",
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    registerBtn: "Sign Up",
    passwordMatch: "Passwords match",
    passwordNoMatch: "Passwords do not match",
    socialAuthError: "Error signing in with Social Accounts",

    // Signup (Company)
    orSignupAsUser: "Or sign up as a user",
    phone: "Phone",
    slug: "Slug",
    country: "Country",
    website: "Website",
    status: "Status",
    logoUrl: "Logo URL",
    description: "Description",

    // General
    welcome: "Welcome",
    registerNow: "Sign up and book your well-deserved vacation now",
    loginBtn: "Login",
    cancel: "Cancel",
    close: "Close",
    notificationSuccess: "Success",
    notificationError: "Error",
    notificationInfo: "Information",
    notificationWarning: "Warning",
  },
  es: {
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
    allRightsReserved: "Todos los Derechos Reservados",

    // Tagline / Hero
    discoverAdventure: "Descubre Tu Próxima",
    aventure: "Aventura",
    heroDescription: "Explora destinos impresionantes que despiertan tu deseo de viajar. Déjanos guiarte hacia experiencias inolvidables y joyas ocultas alrededor del mundo.",
    explore: "Explorar",
    learnMore: "Saber Más",
    findIdealFlight: "Encuentra tu vuelo ideal",
    selectOrigin: "Selecciona origen",
    selectDestination: "Selecciona destino",
    dates: "Fechas",
    departurePlaceholder: "Fecha de salida",
    returnPlaceholder: "Fecha de regreso",
    passengersLabel: "Pasajeros",
    searchFlightsBtn: "Buscar Vuelos",
    pleaseSelectOriginDest: "Por favor selecciona origen y destino para continuar",

    // Destinos (Tagline)
    lasVegas: "Las Vegas",
    lasVegasDesc: "La ciudad que nunca duerme",
    newYork: "New York",
    newYorkDesc: "La Gran Manzana",
    tokyo: "Tokio",
    tokyoDesc: "Tradición y modernidad",
    miami: "Miami",
    miamiDesc: "Playas y vida nocturna",
    london: "London",
    londonDesc: "Historia y cultura",
    mexico: "México",
    mexicoDesc: "Gastronomía y color",
    puertoRico: "Puerto Rico",
    puertoRicoDesc: "Paraíso caribeño",
    paris: "París",
    parisDesc: "La ciudad del amor",
    viewDeals: "Ver Ofertas",
    viewAllDestinations: "Ver Todos los Destinos",
    popularDestinations: "Destinos Populares",
    discoverPopular: "Descubre nuestros destinos más buscados",

    // Login
    welcomeBack: "¡Bienvenido de nuevo!",
    loginDescription: "Accede a tu cuenta para gestionar tus vuelos y disfrutar de una experiencia personalizada.",
    dontHaveAccount: "¿No tienes una cuenta?",
    register: "Regístrate",
    loginTitle: "Iniciar Sesión",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginLoading: "Cargando...",
    loginSuccess: "¡Inicio de sesión exitoso!",
    loginError: "Error al iniciar sesión. Intenta nuevamente.",
    fillAllFields: "Por favor completa todos los campos",

    // Signup (User)
    signupTitle: "Registrarse",
    signupSuccess: "Registro exitoso",
    signupError: "Error al registrar el usuario",
    signupWithGoogle: "Registrarse con Google",
    signupWithFacebook: "Registrarse con Facebook",
    signupWithLinkedIn: "Registrarse con LinkedIn",
    signupWithApple: "Registrarse con Apple",
    orSignupAsCompany: "O registrate como empresa",
    fullName: "Nombres Completo",
    email: "Correo Electronico",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    registerBtn: "Registrarse",
    passwordMatch: "Las contraseñas coinciden",
    passwordNoMatch: "Las contraseñas no coinciden",
    socialAuthError: "Error al Iniciar Sesión con Cuentas de Redes Sociales",

    // Signup (Company)
    orSignupAsUser: "O registrate como usuario",
    phone: "Teléfono",
    slug: "Slug",
    country: "País",
    website: "Sitio Web",
    status: "Estado",
    logoUrl: "URL del Logo",
    description: "Descripción",

    // General
    welcome: "Bienvenido",
    registerNow: "Registrate y reserva ya tus merecidas vacaciones",
    loginBtn: "Iniciar Sesión",
    cancel: "Cancelar",
    close: "Cerrar",
    notificationSuccess: "Éxito",
    notificationError: "Error",
    notificationInfo: "Información",
    notificationWarning: "Advertencia",
  }
};

// Crear el contexto
const LanguageContext = createContext();

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Español por defecto
  const [texts, setTexts] = useState(translations.es);

  useEffect(() => {
    // Recuperar el idioma guardado en localStorage si existe
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
      setTexts(translations[savedLanguage]);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      setTexts(translations[lang]);
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, texts, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};

export default LanguageContext;