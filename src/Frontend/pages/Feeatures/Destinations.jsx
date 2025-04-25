import React from 'react';

export default function Destinations() {
    const destinations = [
        {
            name: 'Nasau, Bahamas',
            description: 'Un paraíso idílico con aguas cristalinas y playas impresionantes.',
            imageUrl: 'https://tempo.cdn.tambourine.com/windsong/media/bmot-islands-nassau-stay-quad-atlantis-65676e2f5d600.jpg',
            site: 'Atlantis Resort',
            siteUrl: 'https://www.atlantisbahamas.com/',
        },
        {
            name: 'París, Francia',
            description: 'La Ciudad de la Luz es famosa por su arte, historia y monumentos icónicos.',
            imageUrl: 'https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/',
            site: 'Torre Eiffel',
            siteUrl: 'https://www.toureiffel.paris/en',
        },
        {
            name: 'Tokio, Japón',
            description: 'Una vibrante metrópoli que mezcla tradición y tecnología moderna.',
            imageUrl: 'https://img.static-kl.com/images/media/216337E7-BFE5-4AA6-9C9E180C3E5AC6A2',
            site: 'Shibuya Crossing',
            siteUrl: 'https://www.gotokyo.org/en/spot/25/index.html',
        },
        {
            name: 'Roma, Italia',
            description: 'Hogar de ruinas antiguas, arte increíble y una cocina deliciosa.',
            imageUrl: 'https://viajes.nationalgeographic.com.es/medio/2025/02/26/roma_d59824b1_250226111509_1280x853.webp',
            site: 'Coliseo',
            siteUrl: 'https://www.coopculture.it/en/colosseo-e-shop.cfm',
        },
        {
            name: 'Ciudad del Cabo, Sudáfrica',
            description: 'Una ciudad impresionante con vistas espectaculares y una cultura diversa.',
            imageUrl: 'https://viajes.nationalgeographic.com.es/medio/2023/05/02/la-peninsula-del-cabo_b06c46d6_288096977_230502131254_1000x667.jpg',
            site: 'Table Mountain',
            siteUrl: 'https://www.tablemountain.net/',
        },
        {
            name: 'Sídney, Australia',
            description: 'Conocida por sus hermosas playas y la icónica Ópera de Sídney.',
            imageUrl: 'https://cdn.prod.website-files.com/64e21a34e41da63fe4f44c5a/663507df3881017b92867aa2_pexels-patrick-995765.jpg',
            site: 'Ópera de Sídney',
            siteUrl: 'https://www.sydneyoperahouse.com/',
        },
        {
            name: 'Nueva York, EE. UU.',
            description: 'La ciudad que nunca duerme, ofreciendo cultura, historia y entretenimiento.',
            imageUrl: 'https://media.revistaad.es/photos/646c8cd087c0381e4abf96f2/3:2/w_3000,h_2000,c_limit/GettyImages-1347979016%20(1).jpg',
            site: 'Times Square',
            siteUrl: 'https://www.timessquarenyc.org/',
        },
        {
            name: 'Dubái, Emiratos Árabes Unidos',
            description: 'Una ciudad futurista con rascacielos icónicos, compras de lujo y aventuras en el desierto.',
            imageUrl: 'https://www.unav.edu/documents/10174/16849987/emiratos-blog.jpg',
            site: 'Burj Khalifa',
            siteUrl: 'https://www.burjkhalifa.ae/en/',
        },
        {
            name: 'Machu Picchu, Perú',
            description: 'Una antigua ciudad inca situada en las montañas de los Andes, famosa por sus misteriosas ruinas.',
            imageUrl: 'https://image-tc.galaxy.tf/wijpeg-7ellqz2uqv2l9plk30futx9jr/experiencias-machu-picchu_wide.jpg?crop=0%2C63%2C1200%2C675',
            site: 'Machu Picchu',
            siteUrl: 'https://www.peru.travel/en/what-to-do/machu-picchu',
        },
        {
            name: 'Barcelona, España',
            description: 'Una ciudad vibrante conocida por su arquitectura, playas e historia cultural rica.',
            imageUrl: 'https://freewalkingtoursbarcelona.com/wp-content/uploads/sites/6/2021/10/bcn-blog2-1024x683.jpeg.webp',
            site: 'Sagrada Familia',
            siteUrl: 'https://sagradafamilia.org/en/',
        }
    ];

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h1>Top 10 Destinos Turísticos</h1>
            <p>Explora los lugares más hermosos del mundo, desde playas tropicales hasta ciudades icónicas.</p>
            {destinations.map((destination, index) => (
                <div key={index} className="destination">
                    <h2>{destination.name}</h2>
                    <p>{destination.description}</p>
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