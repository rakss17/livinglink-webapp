import React from "react";
import "./loading.css";
import Modal from "react-modal";
export default function LoadingModal(props) {
  const { isOpen, textcontent } = props;
  return (
    <Modal
      className="loading-modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
      isOpen={isOpen}
    >
      <div>
        <p>{textcontent}</p>
        <div className="circlecenter">
          <div className="circle"></div>
        </div>
      </div>
    </Modal>
  );
}
