import React, { useState } from "react";
import "./balance.css";
import ButtonModal from "../buttons/buttonmodal";
import Modal from "react-modal";

export default function Balance() {
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
      <div className="balance">
        <div className= "entry">
            <div className="balancecard" onClick={handleTenantCardClick}>
                <div className="balancename">Tenant 1</div>
                <div className="tenantbalance">P</div>
            </div>
            <div className="RM">
                <div className="balancename">RM</div>
            </div>
        </div>
      </div>
      {/*<Modal
        className="modalproperty"
        isOpen={openTenant}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2>Information</h2>
        <h3>Name:</h3>
        <h3>Balance: </h3>
        <div className="buttonss">
          <ButtonModal onClick={handleCancelClick} text="Cancel" />
          <ButtonModal onClick={handleViewClick} text="View" />
        </div>
      </Modal>*/}
    </>
  );
}
