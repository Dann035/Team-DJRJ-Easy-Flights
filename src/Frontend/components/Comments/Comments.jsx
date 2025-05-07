import React, { useEffect, useState } from "react";
const url = import.meta.env.VITE_BACKEND_URL
import { useLanguage } from "../../context/LanguageContext";
import "./Comments.css";
import { useParams } from "react-router-dom";

function Comments() {
  const [comments, setComments] = useState([]);
  const { texts } = useLanguage();
  //GET COMMENT FROM OFFER
  const { id } = useParams();
  const getComments = () => {
    fetch(`${url}/api/offers/${id}/comments`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
      })
      .catch(err => console.error("Error fetching comments", err));
  };
  //POST
  const [newComment, setNewComment] = useState("");

  // const addNewComment = () => {
  //   if (newComment.trim() === "") return;
  //   fetch(`${url}/api/comments`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       content: newComment,
  //       offer_id: offer_id
  //     })
  //   })
  //     .then(res => {
  //       if (!res.ok) throw new Error("Failed to add comment");
  //       return res.json();
  //     })
  //     .then(data => {
  //       setNewComment(""); // vacia input
  //       getComments(); // vuelve a llamar al get
  //     })
  //     .catch(err => {
  //       console.error("Error posting comment", err);
  //     });
  // };

  //DELETE COMMENT
  const deleteComment = (id) => {
    if (!id) {
      console.error("Comment ID is undefined, cannot delete.");
      return;
    }
    fetch(`${url}/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      /*credentials: "include"*/
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Failed to delete comment, status: ${resp.status}`);
        }
        return resp.ok;
      })
      .then(() => {
        getComments();
      })
      .catch((error) =>
        console.error("Error when deleting your comment:", error)
      );
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="cm-container d-flex justify-content-center my-5">
      <div
        className="cm-box p-4 shadow rounded"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <h1 className="title-comments mb-3">{texts.offerReviews}</h1>
        <span style={{ fontSize: "1.5rem" }}>⭐️⭐️⭐️⭐️⭐️</span>

        <hr className="my-4" />

        {comments.length === 0 ? (
          <p>{texts.noReviews}</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="d-flex mb-4 text-start align-items-start gap-3">
              {/* Left: Avatar */}
              <img
                className="me-3"
                src="https://randomuser.me/api/portraits/men/24.jpg"
                alt={texts.reviewer}
                style={{
                  width: "30px",
                  height: "90px",
                  objectFit: "contain",
                }}
              />

              {/* Right: Comment content */}
              <div className="flex-grow-1 border-bottom pb-3">
                <h5 className="mb-1">John Doe</h5>
                <small className="text-muted">{texts.travelBlogger}</small>
                <p className="fst-italic mt-2">"{c.content}"</p>
                <small className="text-muted d-block mb-2">
                  {texts.commentNumber} {c.id}
                </small>
                <button className="btn btn-secondary btn-sm me-2">{texts.edit}</button>
                <button
                  onClick={() => deleteComment(c.id)}
                  className="btn btn-danger btn-sm"
                >
                  {texts.delete}
                </button>
              </div>
            </div>
          ))
        )}

        <div className="text-end mt-4">
          <div className="text-muted" style={{ fontSize: "0.85rem" }}>
            (Logo)
          </div>
          <strong>Air-France</strong>
        </div>
      </div>
    </section>
  );
}

export default Comments;