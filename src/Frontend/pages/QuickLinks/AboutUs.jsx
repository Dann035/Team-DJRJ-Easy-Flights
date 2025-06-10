
// // CARDS DE MISIÓN, VISIÓN, ETC.
const diagramCards = [
  {
    title: "Nuestra Misión",
    content: "Brindar una plataforma confiable y sencilla para planificar viajes personalizados.",
  },
  {
    title: "Visión",
    content: "Ser la herramienta líder en planificación de viajes colaborativos y eficientes.",
  },
  {
    title: "Objetivo",
    content: "Permitir la creación de presupuestos precisos para todo tipo de viajes.",
  },
  {
    title: "Facilitando",
    content: "La división de gastos entre grupos de personas fácilmente.",
  },
  {
    title: "Promoviendo",
    content: "Acceso a paquetes de viajes prediseñados por agencias aliadas.",
  },
  {
    title: "Fomentando",
    content: "La transparencia financiera durante los viajes en grupo.",
  }
];

import { useState, useEffect } from "react";
import "./AboutUs.css"; // Importamos el archivo CSS externo

// Iconos SVG simples
const GitHubIcon = () => (
    <svg
        className="icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.292 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
    </svg>
);

const LinkedInIcon = () => (
    <svg
        className="icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);


export default function AboutUs() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const teamMembers = [
        {
            id: 1,
            name: "Daniel Alejandro Landa",
            alias: "z3ro",
            role: "Full Stack Developer / Team Lead",
            github: "https://github.com/Dann035",
            linkedin: "https://www.linkedin.com/in/daniel-landa-57337b349/",
            image: "./daniel-landa.jpg",
            description:
                "Especializado en arquitectura de aplicaciones, Seguridad, desarrollo Backend y Frontend.",
            direction: "left",
        },
        {
            id: 2,
            name: "Javier Martínez López",
            alias: "El javi",
            role: "Full Stack Developer / Database Specialist",
            github: "https://github.com/JavierML-git",
            linkedin: "https://linkedin.com/in/javiermartinez",
            image: "./img-javier-avatar.jpg",
            description:
            "Especializado en optimización de bases de datos y lógica.",
            direction: "right",
        },
        {
            id: 3,
            name: "Jean Pierre Pluas",
            alias: "jeanpii",
            role: "Full Stack Developer / UX/UI Designer",
            github: "https://github.com/Jampiier25",
            linkedin: "https://linkedin.com/in/jampier",
            image: "https://static.vecteezy.com/system/resources/previews/055/757/552/large_2x/man-with-crossed-arms-posing-over-transparent-background-free-png.png",
            description:
            "Experto en interfaces de usuario y experiencia de usuario.",
            direction: "left",
        },
        {
            id: 4,
            name: "Rafael Abad Giner",
            alias: "rafa",
            role: "Full Stack Developer",
            github: "https://github.com/Rafael468",
            linkedin: "https://linkedin.com/in/rafaabad",
            image: "https://static.vecteezy.com/system/resources/previews/051/765/375/large_2x/portrait-of-a-young-man-with-his-arms-crossed-free-png.png",
            description: "Experto en resoluciones de problemas.",
            direction: "right",
        },
        
    ];

    // const mentores = [
    //     {
    //         id: 5,
    //         name: "Irio Gomez",
    //         alias: "Irio",
    //         role: "Full Stack Developer Senior / Mentor",
    //         image: "./Irio-avatar.webp",
    //         github: "https://github.com/irio-dev",
    //         linkedin: "https://www.linkedin.com/in/iriogomez/",
    //         direction: "left",
    //     },
    //     {
    //         id: 6,
    //         name: "Robert Tovar",
    //         alias: "Robert",
    //         role: "Full Stack Developer / Mentor",
    //         github: "https://github.com/Roberttovarv",
    //         linkedin: "https://www.linkedin.com/in/roberttovarv/",
    //         image: "./Robert-avatar.webp",
    //         direction: "right",
    //     },
    //     {
    //         id: 7,
    //         name: "Lucas Solari",
    //         alias: "Luca",
    //         role: "Full Stack Developer / Mentor",
    //         github: "https://github.com/Lucaso1992",
    //         linkedin: "https://www.linkedin.com/in/lucas-solari/",
    //         image: "./Lucas-avatar.webp",
    //         direction: "left",
    //     }

    // ]

    return (
        <div className="about-us-container">
            {/* Logo con efecto neón */}
            <div className="logo-container-aur">
                <div className="logo-wrapper">
                    <img className="logo-text" src="./Icono-Posible.png" alt="logo" />
                </div>
            </div>

            <div className="main-content">
                {/* Descripción del proyecto */}
                <div className="project-description">
                    <h1 className="project-title">Easy-Flights</h1>
                    <div className="description-content">
                        <p className="description-subtitle">
                            Llevando el viaje al siguiente nivel
                        </p>
                        <p className="description-text">
                            Easy Flights es una plataforma web innovadora que te ayuda a planificar tus viajes de manera sencilla y eficiente. Descubre herramientas inteligentes, tips exclusivos y funcionalidades avanzadas para organizar tu viaje ideal, optimizar tu presupuesto y vivir experiencias inolvidables. ¡Haz que viajar sea increíble con Easy Flights!.
                        </p>
                        <div className="divider"></div>
                    </div>
                </div>
                <section className="diagram-section">
                    <div className="diagram-grid">
                    {diagramCards.map((card, idx) => (
                        <div className="diagram-card" key={idx}>
                        <h3>{card.title}</h3>
                        <p>{card.content}</p>
                        </div>
                    ))}
                    </div>
                </section>
                <div className="team-title-container">
                    <h2 className="team-title">NUESTRO EQUIPO</h2>
                </div>

                <div className="team-members-container">
                    {teamMembers.map((member) => (
                        <TeamMember
                            key={member.id}
                            member={member}
                            scrollY={scrollY}
                        />
                    ))}
                </div>

                {/* <div className="team-title-container">
                    <h2 className="team-title">NUESTROS MENTORES</h2>
                </div>

                <div className="team-members-container">
                    {mentores.map((member) => (
                        <TeamMember
                            key={member.id}
                            member={member}
                            scrollY={scrollY}
                        />
                    ))}
                </div> */}
            </div>
        </div>
    );
}

// Componente para cada miembro del equipo
function TeamMember({ member, scrollY }) {
    // Calcula si el elemento debe estar visible basado en scroll
    const isVisible = () => {
        const element = document.getElementById(`member-${member.id}`);
        if (!element) return false;

        const position = element.getBoundingClientRect();
        return position.top < window.innerHeight - 100;
    };

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            setVisible(isVisible());
        };

        checkVisibility();
        window.addEventListener("scroll", checkVisibility);
        return () => window.removeEventListener("scroll", checkVisibility);
    }, [scrollY]);

    // Determinar las clases CSS basadas en la visibilidad y dirección
    const memberClasses = `team-member ${
        visible
            ? "visible"
            : member.direction === "left"
            ? "hidden-left"
            : "hidden-right"
    }`;

    // Determinar el orden de los elementos basado en el ID
    const imageOrderClass = member.id % 2 === 1 ? "order-first" : "order-last";
    const infoOrderClass = member.id % 2 === 1 ? "order-last" : "order-first";

    return (
        <div id={`member-${member.id}`} className={memberClasses}>
            {/* Imagen con efecto de degradado */}
            <div className={`member-image ${imageOrderClass}`}>
                <div className="image-gradient">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="member-img"
                    />
                </div>
                <div className="image-overlay"></div>
            </div>

            {/* Información con efecto de degradado */}
            <div className={`member-info ${infoOrderClass}`}>
                <div className="info-card">
                    <h3 className="member-name">
                        {member.name}{" "}
                        {member.alias && (
                            <span className="member-alias">
                                ({member.alias})
                            </span>
                        )}
                    </h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-description">{member.description}</p>

                    {/* Botones de redes sociales */}
                    <div className="social-links">
                        <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-button github-button"
                        >
                            <GitHubIcon />
                            <span>GitHub</span>
                        </a>
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-button linkedin-button"
                        >
                            <LinkedInIcon />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
