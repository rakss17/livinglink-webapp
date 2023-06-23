import React, { useState } from "react";
import Modal from "react-modal";
import Navbar from "./../../../../components/navbar";
import logo from "../../../../components/images/logo.png";
import "./selection.css";
import Password from "./../../../../components/inputpassword/password";
import InputField from "./../../../../components/inputfield/inputfield";
import Select from "./../../../../components/inputselect/select";
import ButtonSign from "./../../../../components/buttons/buttonsign";
import { useNavigate } from "react-router-dom";

export default function Selection() {
  const navigate = useNavigate();
  const clickedL = () => {
    navigate("/SignupL");
  };
  const clickedT = () => {
    navigate("/SignupT");
  };
  return (
    <>
      <Navbar
        blankClassName="logoo"
        imageSrc={logo}
        imageAlt="Image description"
        classnameimage="image"
        text="Living Link"
        classnamep="para"
        classnamesignin="signinn"
        classnamesignup="signup"
        classnamebutton="homebutton"
      />
      <div className="container">
        <div className="intro">
          <div className="background">
            <div className="text">
              <p>Living Link</p>
              <p>Application</p>
            </div>
          </div>
        </div>
        <div className="select">
          <p className="signuptext">Selection</p>
          <div className="selectbutton">
            <ButtonSign onClick={clickedL} text="Landlord" />
            <text>------------------------- or -------------------------</text>
            <ButtonSign onClick={clickedT} text="Tenant" />
          </div>
        </div>
      </div>
    </>
  );
}
