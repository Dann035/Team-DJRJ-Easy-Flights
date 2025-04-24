import "./Features.css";

function Features() {
    return (
        <section className="container text-center">
            <div>
                <p>Explore</p>
                <h1 className="fw-bold">Discover Your Next Adventure with Us</h1>
                <p>Uncover breathtaking destinations that inspire wanderlust. Our curated travel packages offer unique experiences tailored just for you.</p>
            </div>
            <div className="d-flex justify-content-between p-3 gap-3">
                <section className="box-feature">
                    <i>Icon</i>
                    <h3>Top Travel Destinations You Can't Miss</h3>
                    <p>From vibrant cities to serene landscapes, explore it all.</p>
                </section>
                <section className="box-feature">
                    <i>Icon</i>
                    <h3>Tailored Travel Packages for Every Traveler</h3>
                    <p>Experience the world with packages designed for you.</p>
                </section>
                <section className="box-feature">
                    <i>Icon</i>
                    <h3>Unique Experiences Await at Every Turn</h3>
                    <p>Create unforgettable memories with our exclusive offerings.</p>
                </section>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-4 mb-3">
                <button className="btn-feature">Learn More</button>
                <button className="btn-feature">Sign Up</button>
            </div>
        </section>
    )
}

export default Features;
