import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner" />
            <p>Cargando...</p>
        </div>
    );
};

export default LoadingSpinner;