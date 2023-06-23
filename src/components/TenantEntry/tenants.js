import React, { useState, useEffect } from "react";
import "./tenants.css";
import ButtonModal from "../buttons/buttonmodal";
import { fetchTenantAndRoomData, getRoomIdAPI } from "../api/api";
import Modal from "react-modal";

export default function Tenants() {
  const [openTenant, setOpenTenant] = useState(false);
  const [tenants, setTenants] = useState([]);
  const token = localStorage.getItem("token");
  const [roomIds, setRoomIds] = useState([]);

  useEffect(() => {
    const getRoomIdAPII = async () => {
      try {
        const roomId = await getRoomIdAPI(token);
        setRoomIds(roomId);
      } catch (error) {
        // Handle error
      }
    };

    getRoomIdAPII();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTenantAndRoomData(token, roomIds, setTenants);
      } catch (error) {
        console.error("Error fetching tenant and room data:", error);
      }
    };

    fetchData();
  }, [token, roomIds]);

  const handleCancelClick = () => {
    setOpenTenant(false);
  };

  const handleTenantCardClick = () => {
    setOpenTenant(true);
  };

  return (
    <>
      <div className="tenants">
        {tenants.length === 0 ? (
          <p>No tenants available</p>
        ) : (
          tenants.map((tenant) => (
            <a
              className="tenantcard"
              key={tenant.id}
              onClick={() => handleTenantCardClick(tenant)}
            >
              <div className="tenantname">{tenant.tenant_name}</div>
              <div className="tenantname">{tenant.room_number}</div>
            </a>
          ))
        )}
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
        <h2>Tenant Information</h2>
        <h3>Room Number:</h3>
        <h3>Tenant Name: </h3>
        <div className="buttonss">
          <ButtonModal onClick={handleCancelClick} text="Cancel" />
        </div>
      </Modal>
    </>
  );
}
