import React, { useState } from "react";
import "./recentEntry.css";
import ButtonModal from "../buttons/buttonmodal";
import Modal from "react-modal";

export default function RecentEntry() {
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
      <div className="RecentEntry">
        <div className="tenantcard-RecentEntry" onClick={handleTenantCardClick}>
          <div className="RecentEntry-name">Tenant Name</div>
          <div className="RecentEntry-name">Date</div>
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
        <h2>Tenant Information</h2>
        <h3>Room Number:</h3>
        <h3>Tenant Name: </h3>
        <div className="buttonss">
          <ButtonModal onClick={handleCancelClick} text="Cancel" />
        </div>
    </Modal>*/}
    </>
  );
}