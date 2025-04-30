import React from "react";
import "./AboutUs.css";

const teamMembers = [
  {
    name: "Daniel Alejandro Landa",
    github: "https://github.com/Dann035",
    instagram: "https://instagram.com/usuario1",
    image: "https://avatars.githubusercontent.com/u/174970168?v=4",
    description: "Desarrollador Full Stack apasionado por la tecnología.",
    smallImage: "/mini1.jpg"
  },
  {
    name: "Javier Martínez López",
    github: "https://github.com/JavierML-git",
    instagram: "https://instagram.com/usuario2",
    image: "/persona2.jpg",
    description: "Full Stack Developer con experiencia en React y Node.",
    smallImage: "/mini2.jpg"
  },
  {
    name: "Jean Pierre Pluas",
    github: "https://github.com/Jampiier25",
    instagram: "https://instagram.com/usuario3",
    image: "/persona3.jpg",
    description: "Desarrollador con pasión por la innovación y UX.",
    smallImage: "/mini3.jpg"
  },
  {
    name: "Rafael Abad Giner",
    github: "https://github.com/Rafael468",
    instagram: "https://instagram.com/usuario4",
    image: "/persona4.jpg",
    description: "Full Stack Developer enfocado en soluciones escalables.",
    smallImage: "/mini4.jpg"
  }
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Conoce al equipo de EasyFlights</h1>
      </header>

      <section className="main-image">
        <img src="/logo-easy-flights.webp" alt="Equipo EasyFlights" />
      </section>

      <section className="intro">
        <p>Bienvenido a EasyFlights, tu plataforma de confianza para encontrar y organizar los mejores paquetes de viajes. Ofrecemos opciones personalizadas y paquetes prediseñados por compañías aliadas, para que elijas cómo, cuándo y a dónde viajar.
            Como usuario registrado, podrás acceder a herramientas exclusivas como nuestro calculador de presupuesto y el estimador de gastos por persona, ideales para planificar con precisión y sin sorpresas. 
Además, te invitamos a conocer al equipo detrás del proyecto: Daniel, Javier, Jean Pierre y Rafa, apasionados por la tecnología y los viajes, comprometidos en hacer que tu experiencia de vuelo sea simple, clara y eficiente.
        </p>
      </section>

      <section className="team">
        {teamMembers.map((member, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
              </div>
              <div className="flip-card-back">
                <img src={member.smallImage} alt={`Mini ${member.name}`} />
                <p>{member.description}</p>
                <a href={member.github} target="_blank" rel="noopener noreferrer">GitHub</a> |
                <a href={member.instagram} target="_blank" rel="noopener noreferrer"> Instagram</a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutUs;
