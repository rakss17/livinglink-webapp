import React, { useState, useEffect } from "react";
import "./properties.css";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonModal from "../buttons/buttonmodal";
import {
  getPropertyDetailsAPI,
  getPropertyAddressAPI,
  getPropertyIdAPI,
  GetUsernameAPI,
  deletePropertyAPI,
} from "../api/api";

export default function Properties() {
  const [openProperty, setOpenProperty] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyIds, setPropertyIds] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handlePropertyClick = (property) => {
    setOpenProperty(true);
    setSelectedProperty(property);
  };
  const handleCancelClick = () => {
    setOpenProperty(false);
  };

  useEffect(() => {
    getPropertyIdAPI(token, setPropertyIds)
      .then((propertyIds) => {
        setPropertyIds(propertyIds);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const data = await getPropertyDetailsAPI(propertyIds, token);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyIds, token]);

  if (!properties) {
    return <p>Loading property details...</p>;
  }
  const handleDeleteProperty = async () => {
    try {
      if (!selectedProperty) {
        return;
      }

      await deletePropertyAPI(
        selectedProperty.property_id,
        token,
        setProperties
      );
      console.log("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleViewClick = () => {
    navigate("/Rooms", {
      state: {
        propertyId: selectedProperty.property_id,
        propertyName: selectedProperty.property_name,
      },
    });
  };

  return (
    <>
      <div className="property">
        {properties.length === 0 ? (
          <p>No properties available</p>
        ) : (
          properties.map((property) => (
            <a
              className="propertycard"
              key={property.id}
              onClick={() => handlePropertyClick(property)}
            >
              <h2>{property.property_name}</h2>
            </a>
          ))
        )}
      </div>
      <Modal
        className="modalproperty"
        isOpen={openProperty}
        overlayClassName="modal-overlay"
      >
        <h2>Information</h2>
        {selectedProperty ? (
          <>
            <div>
              <h3>Property Name: {selectedProperty.property_name}</h3>
              {selectedProperty.address ? (
                <h3>
                  Address: {selectedProperty.address.street},{" "}
                  {selectedProperty.address.barangay},{" "}
                  {selectedProperty.address.city},{" "}
                  {selectedProperty.address.province},{" "}
                  {selectedProperty.address.country},{" "}
                  {selectedProperty.address.zip_code}
                </h3>
              ) : (
                <h3>No Address Found</h3>
              )}
              <h3>No. of Rooms: {selectedProperty.number_of_rooms}</h3>
              {/* Add other property details */}
              <h3>No. of Tenants: </h3>
              <h3>Status: </h3>
            </div>
            <div className="buttonss">
              <ButtonModal
                adjustColor={true}
                onClick={handleDeleteProperty}
                text="Delete"
              />

              <ButtonModal onClick={handleCancelClick} text="Cancel" />
              <ButtonModal onClick={handleViewClick} text="View" />
            </div>
          </>
        ) : (
          <p>Loading property details...</p>
        )}
      </Modal>
    </>
  );
}
