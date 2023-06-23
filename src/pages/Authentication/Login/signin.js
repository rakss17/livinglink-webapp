import React, { useState, useEffect } from "react";
import Navbar from "../../../components/navbar";
import logo from "../../../components/images/logo.png";
import "./styles.css";
import Password from "../../../components/inputpassword/password";
import ButtonSign from "../../../components/buttons/buttonsign";
import InputField from "../../../components/inputfield/inputfield";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { SigninAPI, NavigationProhibit } from "../../../components/api/api";
import LoadingModal from "../../../components/loading modal/loading";
import ErrorModal from "../../../components/errormodal/errormodal";
export default function Signin() {
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    userType: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    NavigationProhibit(token, navigate);
  }, []);

  const submitForm = () => {
    setLoading(true);
    SigninAPI(userInfo, navigate, setLoading, setModalErrorIsOpen);
  };
  const isOnline = navigator.onLine;
  console.log("Internet connectivity:", isOnline);
  const errorModalButton = () => {
    setModalErrorIsOpen(false);
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
        classnamesignin="signin"
        classnamesignup="signupp"
        classnamebutton="homebutton"
      />

      <LoadingModal isOpen={isLoading} textcontent="Signing in..." />
      <ErrorModal
        isOpen={modalErrorIsOpen}
        header="Invalid Credentials!"
        contentone="or your account may not have been activated"
        contenttwo="please check your email for activation"
        textbutton="OK"
        onClick={errorModalButton}
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
        <div className="signinform">
          <p>Sign In</p>
          <div className="inputusernamee">
            <InputField
              placeholder="Username"
              value={userInfo.username}
              onChange={(event) => {
                setUserInfo({ ...userInfo, username: event.target.value });
              }}
            />
          </div>
          <div className="inputpasswordd">
            <Password
              placeholder="Password"
              value={userInfo.password}
              onChange={(event) => {
                setUserInfo({ ...userInfo, password: event.target.value });
              }}
            />
          </div>
          <div className="forgotpassbutton">
            <button>Forgot Password ?</button>
          </div>
          <div className="signinbutton">
            <ButtonSign onClick={submitForm} text="Sign In" />
          </div>
        </div>
      </div>
    </>
  );
}
