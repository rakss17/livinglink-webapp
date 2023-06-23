import React, { useState } from "react";
import "./tenants.css";
import ButtonModal from "../buttons/buttonmodal";
import Modal from "react-modal";

export default function Tenants() {
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
      <div className="tenants">
        <div className="tenantcard" onClick={handleTenantCardClick}>
          <div className="tenantname">Tenant Name</div>
          <div className="roomnumber">Room Number</div>
        </div>
      </div>
      <Modal
        className="modalproperty"
        isOpen={openTenant}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2>Information</h2>
        <h3>Room Number:</h3>
        <h3>Tenant Name: </h3>
        <div className="buttonss">
          <ButtonModal onClick={handleCancelClick} text="Cancel" />
          <ButtonModal onClick={handleViewClick} text="View" />
        </div>
      </Modal>
    </>
  );
}
