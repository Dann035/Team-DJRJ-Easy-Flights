import React from "react";

function TravelShow() {
    return (
        <section>
            <h1>Travel Showcase</h1>
            <p>Explore breathtaking destinations through our stunning photography.</p>
            <div className="ts-images d-flex justify-content-center gap-3 mb-3">
                <img src="https://placehold.co/200x200" alt="Travel Image" />
                <img src="https://placehold.co/200x200" alt="Travel Image" />
                <img src="https://placehold.co/200x200" alt="Travel Image" />
                <img src="https://placehold.co/200x200" alt="Travel Image" />
            </div>
            <div className="ts-images d-flex justify-content-center gap-3">
                <img src="https://placehold.co/200x200" alt="Travel Image" />
                <img src="https://placehold.co/200x200" alt="Travel Image" />
                <img src="https://placehold.co/200x200" alt="Travel Image" />
                <img src="https://placehold.co/200x200" alt="Travel Image" />
            </div>
        </section>
    );
}

export default TravelShow;
