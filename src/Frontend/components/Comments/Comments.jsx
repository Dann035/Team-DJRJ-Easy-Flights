import React, { useEffect, useState } from "react";
const url = import.meta.env.VITE_BACKEND_URL
import { useLanguage } from "../../context/LanguageContext";
import "./Comments.css";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";

function Comments() {
  const { store, dispatch } = useGlobalReducer();
  const comments = store.comments;

  const { texts } = useLanguage();
  //GET COMMENT FROM OFFER
  const { id } = useParams();
  const getComments = () => {
    fetch(`${url}/api/offers/${id}/comments`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "SET_COMMENTS", payload: data });
      })
      .catch(err => console.error("Error fetching comments", err));
  };
  

  //DELETE COMMENT
  const deleteComment = (commentId) => {
  if (!commentId) return;

  fetch(`${url}/api/comments/${commentId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Failed to delete comment");
      return resp.json();
    })
    .then(() => {
      // Refresca la lista de comentarios usando el id correcto de la oferta
      return fetch(`${url}/api/offers/${id}/comments`);
    })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: "SET_COMMENTS", payload: data });
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
        <span style={{ fontSize: "1.5rem" }}></span>

        <hr className="my-4" />

        {comments.length === 0 ? (
          <p>{texts.noReviews}</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="d-flex mb-4 align-items-start gap-2">
              {/* Left: Avatar */}
              <img
                className="imagen-avatar"
                src="https://randomuser.me/api/portraits/men/24.jpg"
                alt={texts.reviewer}
                style={{
                  height: "70px",
                  objectFit: "contain"
                }}
              />

              {/* Right: Comment content */}
              <div className="flex-grow-1 border-bottom pb-3">
                <h5 className="mb-1">John Doe</h5>
                <p className="fst-italic mt-2">⭐️{c.rating}</p>

                {/* <small className="text-muted">{texts.travelBlogger}</small> */}
                <p className="fst-italic mt-2">"{c.content}"</p>
                {/* <small className="text-muted d-block mb-2">Comentario número {c.id}</small> */}
                {/* <button
                  //onClick={()=> editComment(c.id)}
                  className="btn btn-secondary btn-sm mt-3 me-2">Editar
                </button> */}
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