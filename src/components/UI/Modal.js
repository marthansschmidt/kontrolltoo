import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  if (!props.isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={props.onClose}>
      <dialog className="modal" open onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {props.children}
        </div>
        <div className="modal-actions">
          <button onClick={props.onClose} className="text-button">
            Close
          </button>
          <button onClick={props.onCheckout} className="button">
            Checkout
          </button>
        </div>
      </dialog>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;