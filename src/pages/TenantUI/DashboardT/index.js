import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import { useNavigate } from "react-router-dom";
import dashboardicon from "../../../components/images/icons/dashboard-icon.png";
import paymenticon from "../../../components/images/icons/payment-icon.png";
import balanceicon from "../../../components/images/icons/tenantsbalance-icon.png";
import historyicon from "../../../components/images/icons/recentpayments-icon.png";
import feedbackicon from "../../../components/images/icons/feedback-icon.png";
import {
  TenantDashboardAPI,
  getPropertyInfo,
} from "../../../components/api/api";
export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchInfo = async () => {
    try {
      const data = await getPropertyInfo();
      setPropertyDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/Signin");
    }
    fetchInfo();
  }, []);

  const fetchData = async () => {
    TenantDashboardAPI(token, setError, setLoading, navigate);
  };

  if (loading) {
    fetchData();
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!propertyDetails) {
    return <div>Loading property details...</div>;
  }

  return (
    <>
      <Header isOpen={isOpen} logoutni="logout" />
      <Sidebar
        isOpen={isOpen}
        handleToggle={handleToggle}
        name1="Dashboard"
        name2="Payment"
        name3="Check Balance"
        name4="Payment History"
        name5="Feedbacks / Reports"
        icon1={dashboardicon}
        icon2={paymenticon}
        icon3={balanceicon}
        icon4={historyicon}
        icon5={feedbackicon}
        usertype="Tenant"
      />
      <div className="containerT">
        <div className={`infocontainer ${isOpen ? "open" : ""}`}>
          <p>Your landlord name: {propertyDetails.landlord_name}</p>
          <p>Your property name: {propertyDetails.property_name}</p>
          <p>Your room number: {propertyDetails.room_number}</p>
        </div>
      </div>
    </>
  );
}
