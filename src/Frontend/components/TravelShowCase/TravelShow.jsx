import "./TravelShow.css"
import { useLanguage } from "../../context/LanguageContext";
import React from "react";

function TravelShow() {
    const { texts } = useLanguage();
    return (
        <section className="travelS text-center my-5">
            <h1 className="title-tshow">{texts.travelShowTitle}</h1>
            <p>
                {texts.travelShowDesc}
            </p>
            <div className="ts-images d-flex justify-content-center gap-3 mb-3">
                <img
                    className="ts-img"
                    src="https://res.cloudinary.com/lastminute-contenthub/s--i9kiVgPt--/c_limit,h_999999,w_1920/f_auto/q_auto:eco/v1/DAM/Photos/Destinations/Asia/Maldives/shutterstock_432944785_malediven"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <img
                    className="ts-img"
                    src="https://forbes.es/wp-content/uploads/2023/02/DestinosStarForbes_01.jpg"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <img
                    className="ts-img"
                    src="eiffel.webp"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <img
                    className="ts-img"
                    src="https://career-advice.jobs.ac.uk/wp-content/uploads/Japan-e1634207070862.jpg.optimal.jpg"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            </div>
            <div className="ts-images d-flex justify-content-center gap-3">
                <img
                    className="ts-img"
                    src="singapore_final_cover.webp"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <img
                    className="ts-img"
                    src="https://viajes.nationalgeographic.com.es/medio/2023/03/24/big-ben-y-alrededores_852e28a7_475606798_230324072203_1280x841.jpg"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <img
                    className="ts-img"
                    src="https://nyc.eu/wp-content/uploads/2015/07/New_York_City-scaled.jpg"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <img
                    className="ts-img"
                    src="tokyo-lifestyle-arquitectura-elh.webp"
                    alt={texts.travelShowImgAlt}
                    style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
            </div>
        </section>
    );
}

export default TravelShow;