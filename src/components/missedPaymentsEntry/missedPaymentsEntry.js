import React, { useState } from "react";
import "./missedPaymentsEntry.css";
import ButtonModal from "../buttons/buttonmodal";
import Modal from "react-modal";

export default function MissedPaymentsEntry() {
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
      <div className="missedPayments">
        <div className= "missed-entry">
            <div className="missedPaymentscard" onClick={handleTenantCardClick}>
                <div className="missedPayments-name">Tenant 1</div>
                <div className="missedPayments-name">Due Date</div>
                <div className="missedPayments-name">P</div>
            </div>
            <div className="RM">
                <div className="tenantname">RM</div>
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
