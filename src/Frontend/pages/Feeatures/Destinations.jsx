import React, { useState } from 'react';
import './Destinations.css';

export default function Destinations() {
    const [expandedCard, setExpandedCard] = useState(null);

    const destinations = [
        {
            name: 'Nasau, Bahamas',
            description: 'Un paraíso idílico con aguas cristalinas y playas impresionantes.',
            detail: 'Para más información, haz click en la imagen. Recomendamos visitar el Atlantis Resort.',
            imageUrl: 'bmot-islands-nassau-stay-quad-at.webp',
            site: 'Atlantis Resort',
            siteUrl: 'https://www.atlantisbahamas.com/',
        },
        {
            name: 'París, Francia',
            description: 'La Ciudad de la Luz, arte, historia y monumentos icónicos.',
            detail: 'Planifica tu visita a la Torre Eiffel desde su página oficial.',
            imageUrl: 'eiffel.webp',
            site: 'Torre Eiffel',
            siteUrl: 'https://www.toureiffel.paris/en',
        },
        {
            name: 'Tokio, Japón',
            description: 'Tradición y tecnología moderna en una vibrante metrópoli.',
            detail: 'No te pierdas Shibuya Crossing, uno de los cruces peatonales más famosos.',
            imageUrl: 'tokyo-lifestyle-arquitectura-elh.webp',
            site: 'Shibuya Crossing',
            siteUrl: 'https://www.gotokyo.org/en/spot/25/index.html',
        },
        {
            name: 'Roma, Italia',
            description: 'Arte, ruinas antiguas y una cocina inigualable.',
            detail: 'Planifica tu visita al Coliseo desde su sitio oficial.',
            imageUrl: 'roma_d59824b1_250226111509_1280x.webp',
            site: 'Coliseo',
            siteUrl: 'https://www.colosseumdiroma-tickets.com/',
        },
        {
            name: 'Ciudad del Cabo, Sudáfrica',
            description: 'Vistas espectaculares y una cultura vibrante.',
            detail: 'Table Mountain ofrece una de las mejores panorámicas del mundo.',
            imageUrl: 'la-peninsula-del-cabo_b06c46d6_2.webp',
            site: 'Table Mountain',
            siteUrl: 'https://www.tablemountain.net/',
        },
        {
            name: 'Sídney, Australia',
            description: 'Playas hermosas y la icónica Ópera de Sídney.',
            detail: 'Puedes reservar tours guiados a la Ópera desde su web oficial.',
            imageUrl: 'sydney-australia.webp',
            site: 'Ópera de Sídney',
            siteUrl: 'https://www.sydneyoperahouse.com/',
        },
        {
            name: 'Nueva York, EE. UU.',
            description: 'Cultura, historia y entretenimiento sin pausa.',
            detail: 'Visita Times Square para una experiencia neoyorquina completa.',
            imageUrl: 'new-york.webp',
            site: 'Times Square',
            siteUrl: 'https://www.timessquarenyc.org/',
        },
        {
            name: 'Dubái, Emiratos Árabes Unidos',
            description: 'Futuro, lujo y aventuras en el desierto.',
            detail: 'El Burj Khalifa es el edificio más alto del mundo.',
            imageUrl: 'emiratos-blog.webp',
            site: 'Burj Khalifa',
            siteUrl: 'https://www.burjkhalifa.ae/en/',
        },
        {
            name: 'Machu Picchu, Perú',
            description: 'Ruinas incas en lo alto de los Andes.',
            detail: 'Reserva tus entradas con antelación a través del sitio oficial.',
            imageUrl: 'experiencias-machu-picchu_wide.webp',
            site: 'Machu Picchu',
            siteUrl: 'https://www.peru.travel/en/what-to-do/machu-picchu',
        },
        {
            name: 'Barcelona, España',
            description: 'Arquitectura, playas y cultura vibrante.',
            detail: 'La Sagrada Familia es el ícono arquitectónico más reconocido.',
            imageUrl: 'bcn-casi-general.jpg',
            site: 'Sagrada Familia',
            siteUrl: 'https://sagradafamilia.org/en/',
        }
    ];

    const toggleCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">🌍 Top 10 Destinos Turísticos</h1>
            <p className="text-center mb-5">Explora lugares increíbles. Haz clic en una postal para más detalles.</p>

            <div className="row">
                {destinations.map((destination, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4 ">
                        <div className="card h-100 shadow-sm textblack" onClick={() => toggleCard(index)} style={{ cursor: 'pointer' }}>
                            <img src={destination.imageUrl} className="card-img-top" alt={destination.name} />
                            <div className="card-body">
                                <h5 className="card-title ">{destination.name}</h5>
                                <p className="card-text ">{destination.description}</p>
                                {expandedCard === index && (
                                    <>
                                        <p>{destination.detail}</p>
                                        <a href={destination.siteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                            Visita: {destination.site}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}