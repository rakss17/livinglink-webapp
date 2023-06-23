import React from "react";
import "./buttonstyle.css";

export default function ButtonModal(props) {
  const { className } = props;
  const inputClass = `buttonmodal ${className || ""} ${
    props.adjustColor ? "adjusted" : ""
  }`;
  return (
    <button onClick={props.onClick} className={inputClass}>
      {props.text}
    </button>
  );
}
