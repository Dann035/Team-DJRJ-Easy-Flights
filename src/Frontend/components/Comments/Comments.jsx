import "./Comments.css";

function Comments() {
    return (
        <section className="cm-container d-flex justify-content-center my-5">
            <div
                className="text-center p-4 shadow rounded bg-white"
                style={{ maxWidth: "700px", width: "100%" }}
            >
                <h1 className="mb-3">Comments</h1>
                <span style={{ fontSize: "1.5rem" }}>⭐️⭐️⭐️⭐️⭐️</span>
                <p className="fst-italic mt-3">
                    "Traveling with this service was a life-changing experience!
                    Every detail was meticulously planned, making our journey
                    unforgettable."
                </p>

                <hr className="my-4" />

                <div className="d-flex justify-content-between align-items-center flex-wrap text-start">
                    <div className="d-flex align-items-center gap-3">
                        <img
                            className="rounded-circle"
                            src="https://randomuser.me/api/portraits/men/24.jpg"
                            alt="Reviewer"
                            style={{
                                width: "70px",
                                height: "70px",
                                objectFit: "cover",
                            }}
                        />
                        <div>
                            <h5 className="mb-1">John Doe</h5>
                            <small className="text-muted">Travel Blogger</small>
                        </div>
                    </div>
                    <div className="text-end mt-3 mt-md-0">
                        <div
                            className="text-muted"
                            style={{ fontSize: "0.85rem" }}
                        >
                            (Logo)
                        </div>
                        <strong>Air-France</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Comments;
