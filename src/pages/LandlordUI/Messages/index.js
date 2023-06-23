import React, { useState, useEffect } from "react";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import mytenantsicon from "../../../components/images/icons/mytenants-icon.png";
import balanceicon from "../../../components/images/icons/tenantsbalance-icon.png";
import missedicon from "../../../components/images/icons/missedpayments-icon.png";
import recenticon from "../../../components/images/icons/recentpayments-icon.png";
import { useNavigate } from "react-router-dom";
import { LandlordDasboardAPI } from "../../../components/api/api";
import LoadingModal from "../../../components/loading modal/loading";
import Messageslist from "./messages";
export default function Messages(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return navigate("/Signin");
  }

  const fetchData = async () => {
    LandlordDasboardAPI(token, setError, setLoading);
  };

  if (isLoading) {
    fetchData();
    return (
      <div className="connectingbg">
        <LoadingModal
          isOpen={isLoading}
          textcontent="Connecting to server..."
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <Header isOpen={isOpen} logoutni="logout" />
      <Sidebar
        isOpen={isOpen}
        handleToggle={handleToggle}
        name1="My Tenants"
        name2="Tenant's Balance"
        name3="Missed Payments"
        name4="Recent Payments"
        icon1={mytenantsicon}
        icon2={balanceicon}
        icon3={missedicon}
        icon4={recenticon}
        usertype="Landlord"
      />
      <Messageslist isOpen={isOpen}/>
    </>
  );
}
