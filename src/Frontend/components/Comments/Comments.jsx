import React, { useEffect, useState } from "react";
const url= import.meta.env.VITE_BACKEND_URL
import "./Comments.css";


function Comments() {
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      fetch(`${url}/api/offers/37/comments`)
        .then(res => res.json())
        .then(data => {
          console.log("Fetched comments:", data);
          setComments(data);
        })
        .catch(err => console.error("Error fetching comments", err));
    }, []);
  
    return (
      <section className="cm-container d-flex justify-content-center my-5">
      <div
          className="text-center p-4 shadow rounded bg-white"
          style={{ maxWidth: "700px", width: "100%" }}
      >
          <h1 className="mb-3">Comments</h1>
          <span style={{ fontSize: "1.5rem" }}>⭐️⭐️⭐️⭐️⭐️</span>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="mb-4 border-bottom pb-3">
                <p className="fst-italic mt-3">"{c.content}"</p>
                <small className="text-muted">Comment ID: {c.id}</small>
              </div>
            ))
          )}

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
