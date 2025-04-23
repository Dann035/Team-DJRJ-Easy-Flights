import React from "react";

function TravelShow() {
    return (
        <section className="text-center my-5">
            <h1>Travel Showcase</h1>
            <p>Explore breathtaking destinations through our stunning photography.</p>
            <div className="ts-images d-flex justify-content-center gap-3 mb-3">
            <img
  src="https://res.cloudinary.com/lastminute-contenthub/s--i9kiVgPt--/c_limit,h_999999,w_1920/f_auto/q_auto:eco/v1/DAM/Photos/Destinations/Asia/Maldives/shutterstock_432944785_malediven"
  alt="Travel Image"
  style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
/>
                <img src="https://forbes.es/wp-content/uploads/2023/02/DestinosStarForbes_01.jpg" alt="Travel Image" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                <img src="https://image.urlaubspiraten.de/1x1/image/upload/v1628092143/mediavault_images/AdobeStock_103587221_or1mfx.jpg" alt="Travel Image" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                <img src="https://career-advice.jobs.ac.uk/wp-content/uploads/Japan-e1634207070862.jpg.optimal.jpg" alt="Travel Image" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
            <div className="ts-images d-flex justify-content-center gap-3">
                <img src="https://es.aegeanair.com/-/media/Images/HeroImages/singapore_final_cover.jpg?h=800&w=1920&la=es&hash=DE5C7FFF90EFBBA91B1B2B657D3A93B1" alt="Travel Image" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                <img src="https://viajes.nationalgeographic.com.es/medio/2023/03/24/big-ben-y-alrededores_852e28a7_475606798_230324072203_1280x841.jpg" alt="Travel Image" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                <img src="https://nyc.eu/wp-content/uploads/2015/07/New_York_City-scaled.jpg" alt="Travel Image" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                <img src="https://elhype.com/wp-content/uploads/2020/01/tokyo-lifestyle-arquitectura-elhype-c-690x450.jpg" alt="Travel Image" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
        </section>
    );
}

export default TravelShow;
