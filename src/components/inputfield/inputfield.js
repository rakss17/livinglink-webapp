import React from "react";
import "./inputfield.css";

export default function InputField(props) {
  const {
    className,
    error,
    value,
    onChange,
    placeholder,
    type,
    onInput,
    onKeyDown,
  } = props;
  const inputClass = `inputfield ${className || ""} ${
    props.adjustWidth ? "adjusted" : ""
  }`;

  return (
    <div className="inputfieldd">
      <input
        className={inputClass}
        style={{ borderColor: error ? "red" : "" }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        onInput={onInput}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
