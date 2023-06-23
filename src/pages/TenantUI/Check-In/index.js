import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../../components/header";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/inputfield/inputfield";
import ButtonSign from "../../../components/buttons/buttonsign";
import LoadingModal from "../../../components/loading modal/loading";
import ErrorModal from "../../../components/errormodal/errormodal";
import {
  TenantDashboardAPI,
  registerRoom,
  getTenantId,
} from "../../../components/api/api";
export default function CheckIn() {
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tenantId, setTenantId] = useState();
  const [checkindetails, setCheckInDetails] = useState({
    property_name: "",
    room_number: "",
    user_id: tenantId,
  });

  useEffect(() => {
    getTenantId(setTenantId);
  }, []);
  const handleKeyDown = (event) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return navigate("/Signin");
  }

  const fetchData = async () => {
    TenantDashboardAPI(token, setError, setLoading);
  };

  if (loading) {
    fetchData();
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(checkindetails);
    registerRoom(checkindetails, navigate, setIsLoading, setModalErrorIsOpen);
  };
  const errorModalButton = () => {
    setModalErrorIsOpen(false);
  };
  return (
    <>
      <Header isOpen={isOpen} logoutni="logout" />
      <LoadingModal isOpen={isLoading} textcontent="Checking in..." />
      <ErrorModal
        isOpen={modalErrorIsOpen}
        header="Error!"
        contentone="Invalid room number or property name,"
        contenttwo="or Room already occupied"
        textbutton="OK"
        onClick={errorModalButton}
      />
      <div className="container">
        <div className="checkinform">
          <p>Check In</p>
          <div className="propertyname">
            <InputField
              placeholder="Property Name"
              onInput={(event) => {
                const inputValue = event.target.value;
                const capitalizedValue = inputValue.replace(/\b\w/g, (match) =>
                  match.toUpperCase()
                );
                event.target.value = capitalizedValue;
              }}
              onChange={(event) => {
                setCheckInDetails({
                  ...checkindetails,
                  property_name: event.target.value,
                });
              }}
            />
          </div>
          <div className="roomnumber">
            <InputField
              placeholder="Room number"
              type="number"
              onKeyDown={handleKeyDown}
              onChange={(event) => {
                setCheckInDetails({
                  ...checkindetails,
                  room_number: event.target.value,
                });
              }}
            />
          </div>
          <div className="signinbutton">
            <ButtonSign onClick={handleSubmit} text="Submit" />
          </div>
        </div>
      </div>
    </>
  );
}
