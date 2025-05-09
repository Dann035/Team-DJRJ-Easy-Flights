import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import "./OfCard2.css";

export const OfCard2 = ({ offert }) => {
    return (
        <div className="offer-card">
            <div className="offer-card-inner">
                <div className="offer-card-front">
                    <div className="offer-image-container">
                        <img
                            src={offert.image_url}
                            alt={offert.title}
                            className="offer-image"
                        />
                        <span className="offer-price">
                            Desde {offert.price}&nbsp;€
                        </span>
                    </div>
                    <div className="offer-details">
                        <h4 className="offer-title">{offert.title}</h4>
                        <div className="offer-location">
                            <MapPin />
                            <span>{offert.location}</span>
                        </div>
                        <div className="offer-duration">
                            <Calendar />
                            <span>{offert.duration}</span>
                        </div>
                    </div>
                </div>
                <div className="offer-card-back">
                    <p className="offer-back-title">{offert.title}</p>
                    <Link
                        to={"/offerdetails/" + offert.id}
                        className="offer-link"
                    >
                        + INFO
                    </Link>
                </div>
            </div>
        </div>
    );
};
