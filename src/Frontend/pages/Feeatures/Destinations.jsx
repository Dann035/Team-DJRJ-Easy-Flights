import React from 'react';
import "./Destinations.css"

export default function Destinations() {
    const destinations = [
        {
            name: 'Nasau, Bahamas',
            description: 'Un paraíso idílico con aguas cristalinas y playas impresionantes. Para mas informacion Haz click en la imagen.',
            imageUrl: 'bmot-islands-nassau-stay-quad-at.webp',
            site: 'Atlantis Resort',
            siteUrl: 'https://www.atlantisbahamas.com/',
        },
        {
            name: 'París, Francia',
            description: 'La Ciudad de la Luz es famosa por su arte, historia y monumentos icónicos. No olvides planificar tu visita para la Torre Eiffel en sus páginas oficiales, para mas informacion Haz click en la imagen.',
            imageUrl: 'eiffel.webp',
            site: 'Torre Eiffel',
            siteUrl: 'https://www.toureiffel.paris/en',
        },
        {
            name: 'Tokio, Japón',
            description: 'Una vibrante metrópoli que mezcla tradición y tecnología moderna. Planifica tu viaje desde sus portales oficiales. Para mas informacion haz click en la imagen.',
            imageUrl: 'tokyo-lifestyle-arquitectura-elh.webp',
            site: 'Shibuya Crossing',
            siteUrl: 'https://www.gotokyo.org/en/spot/25/index.html',
        },
        {
            name: 'Roma, Italia',
            description: 'Hogar de ruinas antiguas, arte increíble y una cocina deliciosa. No te quedes sin poder visitar el coliseo de Roma planifica tu visita desde sus páginas oficiales, para mas información haz click en la imagen.',
            imageUrl: 'roma_d59824b1_250226111509_1280x.webp',
            site: 'Coliseo',
            siteUrl: 'https://www.colosseumdiroma-tickets.com/',
        },
        {
            name: 'Ciudad del Cabo, Sudáfrica',
            description: 'Una ciudad impresionante con vistas espectaculares y una cultura diversa.',
            imageUrl: 'la-peninsula-del-cabo_b06c46d6_2.webp',
            site: 'Table Mountain',
            siteUrl: 'https://www.tablemountain.net/',
        },
        {
            name: 'Sídney, Australia',
            description: 'Conocida por sus hermosas playas y la icónica Ópera de Sídney.',
            imageUrl: 'sydney-australia.webp',
            site: 'Ópera de Sídney',
            siteUrl: 'https://www.sydneyoperahouse.com/',
        },
        {
            name: 'Nueva York, EE. UU.',
            description: 'La ciudad que nunca duerme, ofreciendo cultura, historia y entretenimiento.',
            imageUrl: 'new-york.webp',
            site: 'Times Square',
            siteUrl: 'https://www.timessquarenyc.org/',
        },
        {
            name: 'Dubái, Emiratos Árabes Unidos',
            description: 'Una ciudad futurista con rascacielos icónicos, compras de lujo y aventuras en el desierto.',
            imageUrl: 'emiratos-blog.webp',
            site: 'Burj Khalifa',
            siteUrl: 'https://www.burjkhalifa.ae/en/',
        },
        {
            name: 'Machu Picchu, Perú',
            description: 'Una antigua ciudad inca situada en las montañas de los Andes, famosa por sus misteriosas ruinas.',
            imageUrl: 'experiencias-machu-picchu_wide.webp',
            site: 'Machu Picchu',
            siteUrl: 'https://www.peru.travel/en/what-to-do/machu-picchu',
        },
        {
            name: 'Barcelona, España',
            description: 'Una ciudad vibrante conocida por su arquitectura, playas e historia cultural rica.',
            imageUrl: 'bcn-casi-general.jpg',
            site: 'Sagrada Familia',
            siteUrl: 'https://sagradafamilia.org/en/',
        }
    ];

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1 className="text-center mb-4 postcard-title">Top 10 Destinos Turísticos</h1>
            <p className="text-center mb-5 ">Explora los lugares más hermosos del mundo, desde playas tropicales hasta ciudades icónicas.</p>
            {destinations.map((destination, index) => (
                <div key={index} className="destination">
                    <h2 className="titlecountry mt-3">{destination.name}</h2>
                    <p >{destination.description}</p>
                    <a href={destination.siteUrl} target="_blank" rel="noopener noreferrer">
                        <img
                            src={destination.imageUrl}
                            alt={destination.name}
                            style={{ width: '100%', borderRadius: '8px', marginTop: '1rem' }}
                        />
                    </a>
                    <p>Visita: <a href={destination.siteUrl} target="_blank" rel="noopener noreferrer">{destination.site}</a></p>
                </div>
            ))}
        </div>
    );
}