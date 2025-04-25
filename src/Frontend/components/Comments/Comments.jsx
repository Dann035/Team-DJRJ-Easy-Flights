import React, { useEffect, useState } from "react";

function Comments() {
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      fetch("https://ideal-enigma-v6q9p7vvx7wqcp6wq-3001.app.github.dev/api/offers/37/comments")
        .then(res => res.json())
        .then(data => {
          console.log("Fetched comments:", data);
          setComments(data);
        })
        .catch(err => console.error("Error fetching comments", err));
    }, []);
  
    return (
      <section className="d-flex justify-content-center my-5">
        <div className="text-center p-4 shadow rounded bg-white" style={{ maxWidth: '700px', width: '100%' }}>
          <h1 className="mb-3">Comments</h1>
  
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
        </div>
      </section>
    );
  }

export default Comments;
