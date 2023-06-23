import React from "react";
import "./buttonstyle.css";

export default function ButtonSign(props) {
  return (
    <button onClick={props.onClick} className="buttonn">
      {props.text}
    </button>
  );
}
