import React, { useState } from "react";
import "./dashboardL.css";
import Properties from "../../../components/properties/properties";
import Modal from "react-modal";
import InputField from "../../../components/inputfield/inputfield";
import {
  setPropertyName,
  setStreet,
  setBarangay,
  setCity,
  setProvince,
  setCountry,
  setNumberOfRooms,
} from "../../../components/properties/propertiesSlice";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rooms from "../../../components/properties/rooms";

export default function DashboardRooms(props) {
  const [openCreate, setOpenCreate] = useState(false);
  const location = useLocation();
  const propertyName = location.state ? location.state.propertyName : null;
  const [properties, setProperties] = useState({
    property_name: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
    country: "",
    number_of_rooms: "",
  });
  const dispatch = useDispatch();
  const handleCreate = () => {
    setOpenCreate(true);
  };
  const handleCreateAdd = () => {
    setOpenCreate(false);
    dispatch(setPropertyName(properties.property_name));
    dispatch(setStreet(properties.street));
    dispatch(setBarangay(properties.barangay));
    dispatch(setCity(properties.city));
    dispatch(setProvince(properties.province));
    dispatch(setCountry(properties.country));
    dispatch(setNumberOfRooms(properties.number_of_rooms));
  };

  return (
    <div className="containerL">
      {/* <AnalyticsGraph /> */}
      <div className={`contentL ${props.isOpen ? "open" : ""}`}>
        <div className="roww">
          <h1>{propertyName}</h1>
        </div>

        <Rooms />
      </div>
    </div>
  );
}
