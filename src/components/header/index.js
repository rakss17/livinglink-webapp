import React, { useState, useEffect } from "react";
import "./styles.css";
import logo from "../../components/images/logo.png";
import { GetUsernameAPI, LogoutAPI } from "../../components/api/api";
import LoadingModal from "../loading modal/loading";
export default function Header(props) {
  const [username, setUsername] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    LogoutAPI(setLoading);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    GetUsernameAPI(token, setUsername);
  }, []);

  return (
    <div className="header">
      <div className={`headertext ${props.isOpen ? "open" : ""}`}>
        <img src={logo} alt="logo" />
        <p>Living Link</p>
      </div>
      <LoadingModal isOpen={isLoading} textcontent="Signing out..." />
      {username ? (
        <div className="displayname">
          {" "}
          <p>{username}</p>
        </div>
      ) : (
        <div className="displayname">
          {" "}
          <p>Please log in.</p>
        </div>
      )}

      <button className={props.logoutni} onClick={handleLogout}>
        Sign out
      </button>
    </div>
  );
}
