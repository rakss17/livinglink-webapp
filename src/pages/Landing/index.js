import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import logo from "../../components/images/logo.png";
import { NavigationProhibit } from "../../components/api/api";
import "./styles.css";

const CHECK_TEXTS = [
  "✓ Payment Management",
  "✓ Tenant Management",
  "✓ Payment Reminder",
];
export default function Landing() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    NavigationProhibit(token, navigate);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((index) => {
        if (index === CHECK_TEXTS.length - 1) {
          return 0;
        } else {
          return index + 1;
        }
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Navbar classnamesignin="signinn" classnamesignup="signupp" />
      <div className="container">
        <div className="intro">
          <div className="background">
            <div className="text">
              <p>Living Link</p>
              <p>Application</p>
            </div>
          </div>
          <div className="about">
            <img src={logo} alt="logo" />

            <p>Get yourself a help from this app</p>
            <div className="checktext">
              {CHECK_TEXTS.map((text, index) => (
                <p
                  key={index}
                  className={
                    index === currentTextIndex
                      ? "typing-text"
                      : index === currentTextIndex - 1 ||
                        (index === 0 &&
                          currentTextIndex === CHECK_TEXTS.length - 1)
                      ? "show-text"
                      : "hidden"
                  }
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
