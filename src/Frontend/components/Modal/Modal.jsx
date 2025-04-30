import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => (
    <div className="modal-backdrop">
        <div className="modal-content">
            <button className="modal-close" onClick={onClose}>X</button>
            {children}
        </div>
    </div>
);

export default Modal;