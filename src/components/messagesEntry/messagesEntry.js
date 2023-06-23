import React, { useState } from "react";
import "./messagesEntry.css";
import ButtonModal from "../buttons/buttonmodal";
import Modal from "react-modal";

export default function MessagesEntry() {
  const [openTenant, setOpenTenant] = useState(false);

  const handleCancelClick = () => {
    setOpenTenant(false);
  };

  const handleViewClick = () => {
    // Handle the click event for viewing room details
  };

  const handleTenantCardClick = () => {
    setOpenTenant(true);
  };

  return (
    <>
      <div className="messagesEntry">
        <div className="messagesEntry-card" onClick={handleTenantCardClick}>
          <div className="messagesEntry-name">Tenant Name</div>
          <div className="messagesEntry-hour">Hour</div>
        </div>
      </div>
      <Modal
        className="modalchat"
        isOpen={openTenant}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="head">
            <div className="header-name">Tenant Name</div>
            <div className="exit">
              <div onClick={handleCancelClick} >X</div>
            </div>
        </div>

        <div className="conversation">
          <div className="chat">
              <div className="chat-text">
                Hello Ma'am
              </div>
          </div>
          <div className="reply">
              <div className="reply-text">
                Uy Ma'am
              </div>
          </div>
        </div>
        <div className="footer">
          <input className="footer-input">
          </input>
          <div className="buttonssend">
          <ButtonModal onClick={handleCancelClick} text="Send" />
        </div>
        </div>
        
      </Modal>
    </>
  );
}