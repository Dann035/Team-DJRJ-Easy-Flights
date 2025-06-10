import React, { useState } from 'react';
import './Discover.css';

// Mapeo de países en español (clave en minúscula) a inglés
const paisesEnIngles = {
  "españa": "Spain",
  "japón": "Japan",
  "francia": "France",
  "alemania": "Germany",
  "estados unidos": "United States",
  "méxico": "Mexico",
  "argentina": "Argentina",
  "brasil": "Brazil",
  "italia": "Italy",
  "reino unido": "United Kingdom",
  "canadá": "Canada",
  "australia": "Australia",
};

// Descripciones turísticas con enlaces externos
const descripcionesPais = {
  "Spain": {
    texto: "España es famosa por ciudades como Barcelona, Madrid y Sevilla. Sitios de interés incluyen la Sagrada Familia, la Alhambra y la Plaza Mayor.",
    url: "https://www.spain.info/es/"
  },
  "Japan": {
    texto: "Japón ofrece una mezcla única de tradición y modernidad. Lugares populares incluyen Tokio, Kioto, el Monte Fuji y los templos antiguos.",
    url: "https://www.japan.travel/es/"
  },
  "France": {
    texto: "Francia destaca por su cultura, vino y arquitectura. Visita París, la Torre Eiffel, el Louvre y la Costa Azul.",
    url: "https://www.france.fr/es"
  },
  "Germany": {
    texto: "Alemania combina historia y tecnología. Berlín, Múnich, el Muro de Berlín y el castillo de Neuschwanstein son imperdibles.",
    url: "https://www.germany.travel/es/home.html"
  },
  "Italy": {
    texto: "Italia es conocida por su arte, comida y arquitectura. No te pierdas Roma, Venecia, Florencia y la Toscana.",
    url: "https://www.italia.it/es"
  },
  "Mexico": {
    texto: "México destaca por su historia prehispánica, playas y comida. Visita Ciudad de México, Cancún, Chichén Itzá y Oaxaca.",
    url: "https://visitmexico.com"
  },
};

const Discover = () => {
  const [pais, setPais] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  const buscarPais = async () => {
    if (!pais.trim()) {
      setError('Por favor, introduce un país.');
      setInfo(null);
      return;
    }

    const paisNormalizado = pais.trim().toLowerCase();
    const paisEnIngles = paisesEnIngles[paisNormalizado] || pais.trim();

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${paisEnIngles}?fullText=true`);
      if (!response.ok) throw new Error('País no encontrado');

      const data = await response.json();
      const paisInfo = data[0];

      // Usamos el nombre común del país para buscar la descripción
      const paisNombreIngles = paisInfo.name.common;
      const descripcionObj = descripcionesPais[paisNombreIngles];

      setInfo({
        nombre: paisInfo.name.official,
        capital: paisInfo.capital?.[0] || 'No disponible',
        poblacion: paisInfo.population.toLocaleString(),
        idioma: Object.values(paisInfo.languages || {}).join(', ') || 'No disponible',
        moneda: Object.values(paisInfo.currencies || {}).map(m => `${m.name} (${m.symbol})`).join(', ') || 'No disponible',
        continente: paisInfo.region,
        bandera: paisInfo.flags.png,
        descripcion: descripcionObj?.texto || 'Información turística no disponible.',
        link: descripcionObj?.url || null,
      });

      setError('');
    } catch (err) {
      setError('No se pudo obtener información del país. Intenta con otro nombre.');
      setInfo(null);
    }
  };

  // Función para manejar el evento "Enter"
  const manejarEnter = (e) => {
    if (e.key === 'Enter') {
      buscarPais();
    }
  };

  return (
    <div className="container discovercontainer">
      <h1>Descubre tu Destino</h1>
      <p>Consulta información útil sobre el país que deseas visitar.</p>

      <input
        type="text"
        placeholder="Ej: españa, japón"
        value={pais}
        onChange={(e) => setPais(e.target.value)}
        onKeyDown={manejarEnter}  // Detectar cuando se presiona la tecla Enter
      />
      <button onClick={buscarPais}>Buscar</button>

      {error && <p className="error">{error}</p>}

      {info && (
        <div className="infobox">
          <h2>{info.nombre}</h2>
          <p><strong>Capital:</strong> {info.capital}</p>
          <p><strong>Población:</strong> {info.poblacion}</p>
          <p><strong>Idioma(s):</strong> {info.idioma}</p>
          <p><strong>Moneda:</strong> {info.moneda}</p>
          <p><strong>Continente:</strong> {info.continente}</p>
          <p><strong>Descripción turística:</strong> {info.descripcion}</p>
          {info.link && (
            <p>
              <a href={info.link} target="_blank" rel="noopener noreferrer">
                Más información turística
              </a>
            </p>
          )}
          <img src={info.bandera} alt={`Bandera de ${info.nombre}`} />
        </div>
      )}
    </div>
  );
};

export default Discover;