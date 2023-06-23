import React, { useState, useEffect } from "react";
import "./properties.css";
import Modal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonModal from "../buttons/buttonmodal";
import { getPropertyRoomsAPI, deleteRoomAPI, getTenantName } from "../api/api";
import LoadingModal from "../loading modal/loading";

export default function Rooms() {
  const [openProperty, setOpenProperty] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [tenantName, setTenantName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const propertyId = location.state ? location.state.propertyId : null;
  const propertyName = location.state ? location.state.propertyName : null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        setIsLoading(true);
        const roomsData = await getPropertyRoomsAPI(propertyId);
        setRooms(roomsData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching rooms data:", error);
        setIsLoading(false);
      }
    };

    fetchRoomsData();
  }, []);

  const handleRoomsClick = async (room) => {
    const tenantName = await getTenantName(propertyName, room.room_number);

    const updatedRoom = { ...room, tenantName };
    setSelectedRoom(updatedRoom);
    setOpenProperty(true);
  };

  const handleCancelClick = () => {
    setOpenProperty(false);
  };

  const handleViewClick = () => {
    // Handle the click event for viewing room details
  };
  const handleDeleteProperty = async () => {
    try {
      if (!selectedRoom) {
        return;
      }

      await deleteRoomAPI(selectedRoom.id, token, setRooms);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };
  return (
    <>
      <div className="property">
        <LoadingModal isOpen={isLoading} textcontent="Loading rooms..." />
        {rooms.length === 0 ? (
          <p>No rooms available</p>
        ) : (
          rooms.map((room) => (
            <a
              className="propertycard"
              key={room.id}
              onClick={() => handleRoomsClick(room)}
            >
              <h2>Room No. {room.room_number}</h2>
            </a>
          ))
        )}
      </div>
      <Modal
        className="modalproperty"
        isOpen={openProperty}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2>Information</h2>
        {selectedRoom && (
          <>
            <h3>Room Number: {selectedRoom.room_number}</h3>
            <h3>Tenant Name: {selectedRoom.tenantName}</h3>
          </>
        )}
        <div className="buttonss">
          <ButtonModal
            onClick={handleDeleteProperty}
            adjustColor={true}
            text="Delete"
          />

          <ButtonModal onClick={handleCancelClick} text="Cancel" />
          <ButtonModal onClick={handleViewClick} text="View" />
        </div>
      </Modal>
    </>
  );
}
