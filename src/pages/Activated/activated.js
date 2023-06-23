import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import logo from "../../components/images/logo.png";
import "./styles.css";

export default function Acivated() {
  return (
    <>
      <Navbar
        blankClassName="logoo"
        imageSrc={logo}
        imageAlt="Image description"
        classnameimage="image"
        text="Living Link"
        classnamep="para"
        classnamesignin="blank1"
        classnamesignup="blank2"
      />
      <div className="container">
        <div className="textactivated">
          <p>Your account is activated</p>
          <p>Thank you for using our application</p>
          <p>You can now log in.</p>
        </div>
      </div>
    </>
  );
}
