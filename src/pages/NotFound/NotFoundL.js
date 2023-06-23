import React, { useState, useEffect } from "react";
import "./NotFoundL.css";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";

import LoadingModal from "../../components/loading modal/loading";
import ErrorModal from "../../components/errormodal/errormodal";
import { LandlordDasboardAPI, registerRoom } from "../../components/api/api";
export default function NotFoundL() {
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

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return navigate("/Signin");
  }

  const fetchData = async () => {
    LandlordDasboardAPI(token, setError, setLoading);
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
      <div className="container">404 Not Found</div>
    </>
  );
}
