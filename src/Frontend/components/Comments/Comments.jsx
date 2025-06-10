import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./Comments.css";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useAuth } from "../../hooks/useAuthContext";
const url = import.meta.env.VITE_BACKEND_URL


function Comments() {
  const { store, dispatch } = useGlobalReducer();
  const { user } = useAuth()
  const comments = store.comments;
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { texts } = useLanguage();

  
  //GET COMMENT FROM OFFER
  const { id } = useParams();
  const getComments = () => {
    fetch(`${url}/api/offers/${id}/comments`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
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
        return fetch(`${url}/api/offers/${id}/comments`);
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch comments after deletion");
        return res.json();
      })
      .then(data => {
        dispatch({ type: "SET_COMMENTS", payload: data });
        console.log("Fetched comments:", data);
      })
      .catch((error) =>
        console.error("Error in your comments:", error)
      );
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <section className="cm-container d-flex justify-content-center my-5">
      <div
        className="cm-box p-4 shadow rounded"
        style={{ maxWidth: "700px", width: "100%" }} >
        <h1 className="title-comments mb-3">{texts.offerReviews}</h1>
        <span style={{ fontSize: "1.5rem" }}></span>

        <hr className="my-4" />

        {comments.length === 0 ? (
          <p>{texts.noReviews}</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="d-flex mb-4 align-items-start gap-2">
              {}
              {c.user_avatar ? (
                <img
                  className="imagen-avatar"
                  src={`${c.user_avatar}`}
                  alt={c.user_name || "Usuario"}
                  style={{
                    height: "35px",
                    width: "35px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : c.user_name ? (
                <div className="user-avatar placeholder-avatar">
                  {c.user_name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <img
                  className="imagen-avatar"
                  src="https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                  alt="Anon"
                  style={{
                    height: "35px",
                    width: "35px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              )}

              {/* Right: Comment content */}
              <div className="flex-grow-1 border-bottom pb-3">
                <h5 className="mb-1">{c.user_name || "Usuario anónimo"}</h5>
                <p className="fst-italic mt-2">⭐️{c.rating}</p>

                {/* <small className="text-muted">{texts.travelBlogger}</small> */}
                <p className="fst-italic mt-2">"{c.content}"</p>
                {/* <small className="text-muted d-block mb-2">Comentario número {c.id}</small> */}
                {/* <button
                  //onClick={()=> editComment(c.id)}
                  className="btn btn-secondary btn-sm mt-3 me-2">Editar
                </button> */}
                {storedUser?.id === c.user_id && (
                  <button
                    onClick={() => deleteComment(c.id)}
                    className="btn btn-danger btn-sm"
                  >
                    {texts.delete}
                  </button>
                )}
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