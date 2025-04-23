import React, { useState } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const OffersCard = ({offert}) => {

  const {store,dispatch} = useGlobalReducer()
  const [showModal,setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: offert.title,
    description: offert.description,
    price: offert.price,
    type_offert:offert.type_offert,
    image_url:offert.image_url
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteOffer = () => {
    fetch(
      `https://turbo-space-invention-g47jx555vvx9c95jv-3001.app.github.dev/api/offers/${offert.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }, 
      }
    )
      .then((res) => {
        if (res.ok) {
          dispatch({ type: "delete_offers", payload: offert.id });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const handleEdit = () => {
    fetch(
      `https://turbo-space-invention-g47jx555vvx9c95jv-3001.app.github.dev/api/offers/${offert.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch({ type: "edit_offer", payload: data });
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
    return (
      <div className="container">
        <div className="card">
          <div className="container text-center">
            <div className="row">
              <div>
                <img src={offert.image_url} alt="1" />
                <p>{offert.title}</p>
                <p>{offert.description}</p>
                <p>{offert.type_offert}</p>
                <p>{offert.price}</p>


                
                <button onClick={()=>deleteOffer()}>❌</button>
                <button onClick={()=> setShowModal(true)}>✏️</button>
              </div>

            </div>
          </div>
         
         {/* MODAL */}

         {showModal && (
            <div className="modal" style={modalStyles}>
              <div className="modal-content" style={modalContentStyles}>
                <h3>Editar Oferta</h3>
                <form>
                  <div>
                    <label htmlFor="title">Titulo</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                  </div>
                  <div>
                    <label htmlFor="description">Descripcion</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange}/>
                  </div>
                  <div>
                    <label htmlFor="price">Precio</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange}/>
                  </div>
                  <div>
                    <label htmlFor="type_offert">Tipo de Oferta</label>
                    <input type="text" name="type_offert" value={formData.type_offert} onChange={handleChange}/>
                  </div>
                  <div>
                    <label htmlFor="image_url">Imagen</label>
                    <input type="text" name="image_url" value={formData.image_url} onChange={handleChange}/>
                  </div>

                  <button type="button" onClick={handleEdit}>
                    Guardar
                  </button>
                  <button type="button" onClick={()=> setShowModal(false)}>
                    Cancelar
                  </button>
                </form>

              </div>

            </div>
         )}

        </div>
      </div>
    );
}

// Estilos para el modal
const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  textAlign: "center",
};