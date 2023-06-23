import React, { useState } from "react";
import Modal from "react-modal";
import Navbar from "./../../../../components/navbar";
import logo from "../../../../components/images/logo.png";
import "./signup.css";
import Password from "./../../../../components/inputpassword/password";
import InputField from "./../../../../components/inputfield/inputfield";
import ButtonSign from "./../../../../components/buttons/buttonsign";
import LoadingModal from "../../../../components/loading modal/loading";
import ErrorModal from "../../../../components/errormodal/errormodal";
import {
  setFirstName,
  setLastName,
  setUserName,
  setMobileNumber,
  setPassword,
  setConfirmPassword,
} from "./signupSlice";
import { useDispatch } from "react-redux";
import { SignupAPI } from "../../../../components/api/api";

// const isValidObjField = (obj) => {
//   return Object.values(obj).every((value) => value.trim());
// };

const updateErrorFN = (errorFirstname, stateUpdater) => {
  stateUpdater(errorFirstname);
};
const updateErrorLN = (errorLastname, stateUpdater) => {
  stateUpdater(errorLastname);
};
const updateErrorMN = (errorMobilenumber, stateUpdater) => {
  stateUpdater(errorMobilenumber);
};
const updateErrorEM = (errorEmail, stateUpdater) => {
  stateUpdater(errorEmail);
};
const updateErrorUN = (errorUsername, stateUpdater) => {
  stateUpdater(errorUsername);
};
const updateErrorPW = (errorPassword, stateUpdater) => {
  stateUpdater(errorPassword);
};
const updateErrorCP = (errorConfirmpass, stateUpdater) => {
  stateUpdater(errorConfirmpass);
};
const updateErrorAllP = (errorConfirmpass, stateUpdater) => {
  stateUpdater(errorConfirmpass);
};
const updateErrorALL = (errorAll, stateUpdater) => {
  stateUpdater(errorAll);
};

const isPasswordValid = (value) => {
  const regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return regx.test(value);
};
const isValidEmail = (value) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};

export default function SignupT() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    is_landlord: false,
    mobile_number: "",
    password: "",
    confirm_password: "",
  });
  const handleKeyDown = (event) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(key)) {
      event.preventDefault();
    }
  };
  const [errorFirstname, setErrorFirstname] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const [errorMobilenumber, setErrorMobilenumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmpass, setErrorConfirmpass] = useState("");
  const [errorAllpass, setErrorAllpass] = useState("");
  const [errorAll, setErrorAll] = useState("");

  const {
    first_name,
    last_name,
    email,
    username,
    mobile_number,
    password,
    confirm_password,
  } = userInfo;
  const isValidForm = () => {
    // if (!isValidObjField(userInfo))
    //   return updateErrorALL("Required all fields!", setErrorAll);
    if (!first_name.trim() || first_name.length < 3)
      return updateErrorFN("Invalid name!", setErrorFirstname);
    if (!last_name.trim() || last_name.length < 3)
      return updateErrorLN("Invalid name!", setErrorLastname);
    if (!isValidEmail(email))
      return updateErrorEM("Invalid email!", setErrorEmail);
    if (!mobile_number.trim() || mobile_number.length < 11)
      return updateErrorMN("Invalid mobile number!", setErrorMobilenumber);
    if (!username.trim() || username.length < 3)
      return updateErrorUN("Invalid username!", setErrorUsername);
    if (!isPasswordValid(password))
      return updateErrorPW(
        "Password must contain: Atleast one digit and one special character, 8 to 16 characters",
        setErrorPassword
      );
    if (!isPasswordValid(confirm_password))
      return updateErrorCP(
        "Password must contain: Atleast one digit and one special character, 8 to 16 characters",
        setErrorConfirmpass
      );
    if (password !== confirm_password)
      return updateErrorAllP("Password does not match!", setErrorAllpass);

    return true;
  };

  const submitForm = () => {
    if (userInfo) {
      setErrorAll("");
    }
    if (first_name.trim() || first_name.length < 3) {
      setErrorFirstname("");
    }
    if (last_name.trim() || last_name.length < 3) {
      setErrorLastname("");
    }
    if (mobile_number.trim() || mobile_number.length >= 11) {
      setErrorMobilenumber("");
    }

    if (username.trim() || username.length >= 11) {
      setErrorUsername("");
    }
    if (isValidEmail(email)) {
      setErrorEmail("");
    }
    if (isPasswordValid(password) || isPasswordValid(confirm_password)) {
      setErrorPassword("");
      setErrorConfirmpass("");
    }

    if (password === confirm_password) {
      setErrorAllpass("");
    }
    if (isValidForm()) {
      dispatch(setFirstName(userInfo.first_name));
      dispatch(setLastName(userInfo.last_name));
      dispatch(setUserName(userInfo.username));
      dispatch(setMobileNumber(userInfo.mobile_number));
      dispatch(setPassword(userInfo.password));
      dispatch(setConfirmPassword(userInfo.confirm_password));
      setErrorAll("");
      setLoading(true);
      SignupAPI(userInfo, setLoading, setModalIsOpen, setModalErrorIsOpen);
    }
  };
  const errorModalButton = () => {
    setModalErrorIsOpen(false);
  };
  const successModalButton = () => {
    window.location.reload();
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
        <LoadingModal isOpen={isLoading} textcontent="Signing up..." />
        <ErrorModal
          isOpen={modalErrorIsOpen}
          header="Sign up Error"
          contentone="User is already existing or"
          contenttwo="It may be server issues."
          textbutton="Ok"
          onClick={errorModalButton}
        />
        <div className="signupform">
          <p className="signuptext">Tenant</p>
          <div style={{ marginTop: "10px" }}>
            {errorAll ? <p className="errortext">{errorAll}</p> : null}
          </div>
          <div className="inputfullname">
            <div className="inputcolumn">
              <InputField
                error={errorFirstname}
                value={first_name}
                placeholder="First name"
                onInput={(event) => {
                  const inputValue = event.target.value;
                  const capitalizedValue = inputValue.replace(
                    /\b\w/g,
                    (match) => match.toUpperCase()
                  );
                  event.target.value = capitalizedValue;
                }}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, first_name: event.target.value });
                }}
              />
              {errorFirstname ? (
                <p className="errortext">{errorFirstname}</p>
              ) : null}
            </div>
            <div className="inputcolumn">
              <InputField
                error={errorLastname}
                value={last_name}
                placeholder="Last name"
                onInput={(event) => {
                  const inputValue = event.target.value;
                  const capitalizedValue = inputValue.replace(
                    /\b\w/g,
                    (match) => match.toUpperCase()
                  );
                  event.target.value = capitalizedValue;
                }}
                onChange={(event) => {
                  setUserInfo({ ...userInfo, last_name: event.target.value });
                }}
              />
              {errorLastname ? (
                <p className="errortext">{errorLastname}</p>
              ) : null}
            </div>
          </div>

          <div className="inputother">
            <div className="inputcolumn">
              <InputField
                error={errorEmail}
                value={email}
                placeholder="Email address"
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    email: event.target.value,
                  });
                }}
              />
              {errorEmail ? <p className="errortext">{errorEmail}</p> : null}
            </div>
            <div className="inputcolumn">
              <InputField
                error={errorMobilenumber}
                value={mobile_number}
                onKeyDown={handleKeyDown}
                placeholder="Mobile number"
                type="number"
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    mobile_number: event.target.value,
                  });
                }}
              />
              {errorMobilenumber ? (
                <p className="errortext">{errorMobilenumber}</p>
              ) : null}
            </div>
          </div>
          <div className="inputusernamee">
            <InputField
              error={errorUsername}
              value={username}
              placeholder="Username"
              onChange={(event) => {
                setUserInfo({ ...userInfo, username: event.target.value });
              }}
            />
            {errorUsername ? (
              <p className="errortext">{errorUsername}</p>
            ) : null}
          </div>
          <div className="inputpassword">
            <div className="inputcolumn">
              <Password
                error={errorPassword}
                value={password}
                placeholder="Password"
                enablesReturnKeyAutomatically
                onChange={(event) => {
                  setUserInfo({ ...userInfo, password: event.target.value });
                }}
              />
              {errorPassword ? (
                <p className="errortext">{errorPassword}</p>
              ) : null}
              {errorAllpass ? (
                <p className="errortext">{errorAllpass}</p>
              ) : null}
            </div>
            <div className="inputcolumn">
              <Password
                error={errorConfirmpass}
                value={confirm_password}
                placeholder="Confirm Password"
                enablesReturnKeyAutomatically
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    confirm_password: event.target.value,
                  });
                }}
              />
              {errorConfirmpass ? (
                <p className="errortext">{errorConfirmpass}</p>
              ) : null}
              {errorAllpass ? (
                <p className="errortext">{errorAllpass}</p>
              ) : null}
            </div>
          </div>

          <div className="signupbutton">
            <ButtonSign onClick={submitForm} text="Sign Up" />
          </div>
          <Modal
            className="modal"
            isOpen={modalIsOpen}
            overlayClassName="modal-overlay"
          >
            <h2>Successfully Registered!</h2>
            <p>Please check your email to activate your account</p>
            <div className="buttons">
              <button className="Ok" onClick={successModalButton}>
                Ok
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
