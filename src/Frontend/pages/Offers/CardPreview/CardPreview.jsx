import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import "./CardPreview.css";

export const CardPreview = ({ offer }) => {
    return (
        <div className="offer-card">
            <div className="offer-card-inner">
                <div className="offer-card-front">
                    <div className="offer-image-container">
                        <img
                            src={offer.image_url || null}
                            alt={offer.title}
                            className="offer-image"
                        />
                        <span className="offer-price">
                            Desde {offer.price}&nbsp;€ pp
                        </span>
                    </div>
                    <div className="offer-details">
                        <h4 className="offer-title">{offer.title}</h4>
                        <div className="offer-location">
                            <MapPin />
                            <span>{offer.location}</span>
                        </div>
                        <div className="offer-duration">
                            <Calendar />
                            <span>{offer.duration}</span>
                        </div>
                    </div>
                </div>
                <div className="offer-card-back">
                    <p className="offer-back-title">{offer.title}</p>
                    <Link
                        to={"/offerdetails/" + offer.id}
                        className="offer-link"
                    >
                        + INFO
                    </Link>
                </div>
            </div>
        </div>
    );
};
