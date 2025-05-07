import React from "react";

const Modal = ({ text }) => (
    <AnimatePresence>
                {showModal && (
                    <motion.div 
                        className="notification-modal"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                    >
                        <FaInfoCircle className="info-icon" />
                        <p>{text}</p>
                    </motion.div>
                )}
            </AnimatePresence>
);

export default Modal;