import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Import i18n configuration
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Footer from './components/Footer';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';//fontawesome//

function App() {
  // Estado para manejar la autenticación (ejemplo simplificado)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="app-container">
          <Navbar 
            isLoggedIn={isLoggedIn} 
            userInfo={userInfo} 
            handleLogout={handleLogout} 
          />
          
          <main className="container-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/login" 
                element={
                  <Login 
                    setIsLoggedIn={setIsLoggedIn} 
                    setUserInfo={setUserInfo} 
                  />
                } 
              />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
