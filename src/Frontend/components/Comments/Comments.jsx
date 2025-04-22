import React from "react";

function Comments() {
    return (
        <section>
            <h1>Comments</h1>
            <span>⭐️⭐️⭐️⭐️⭐️</span>
            <p>"Traveling with this service was a life-changing experience! Every detail was meticulously planned, making our journey unforgettable."</p>
            <div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <section>
                        <img className="rounded-circle" src="https://placehold.co/70" alt="" />
                    </section>
                    <section>
                        <h2>John Doe</h2>
                        <p>Travel Blogger</p>
                    </section>
                    <section>
                        <i>(Logo)</i>
                        <strong>Air-France</strong>
                    </section>
                </div>
            </div>
            
        </section>
    )
}

export default Comments;
