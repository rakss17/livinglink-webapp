import React from "react";
import Modal from "react-modal";
import "./errormodal.css";

export default function ErrorModal(props) {
  const { header, contentone, contenttwo, textbutton, isOpen, onClick } = props;
  return (
    <Modal
      className="modalsignin"
      isOpen={isOpen}
      overlayClassName="modal-overlay"
    >
      <h2>{header}</h2>
      <p>{contentone}</p>
      <p>{contenttwo}</p>
      <div className="buttons">
        <button className="Ok" onClick={onClick}>
          {textbutton}
        </button>
      </div>
    </Modal>
  );
}
