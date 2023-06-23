import React, { useState, useEffect } from "react";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";
import dashboardicon from "../../../components/images/icons/dashboard-icon.png";
import mytenantsicon from "../../../components/images/icons/mytenants-icon.png";
import balanceicon from "../../../components/images/icons/tenantsbalance-icon.png";
import missedicon from "../../../components/images/icons/missedpayments-icon.png";
import recenticon from "../../../components/images/icons/recentpayments-icon.png";
import { useNavigate } from "react-router-dom";
import { LandlordDasboardAPI } from "../../../components/api/api";
import LoadingModal from "../../../components/loading modal/loading";
import Recent from "./recent";
export default function RecentPayments(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/Signin");
    }
  }, []);

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
        name1="Dashboard"
        name2="My Tenants"
        name3="Tenant's Balance"
        name4="Missed Payments"
        name5="Recent Payments"
        icon1={dashboardicon}
        icon2={mytenantsicon}
        icon3={balanceicon}
        icon4={missedicon}
        icon5={recenticon}
        path1="/DashboardL"
        path2="/MyTenants"
        path3="/TenantsBalance"
        path4="/MissedPayments"
        path5="/RecentPayments"
        usertype="Landlord"
      />
      <Recent isOpen={isOpen} />
    </>
  );
}
