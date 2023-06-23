import React from 'react'
import { useState } from 'react';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './password.css'

export default function Password(props){
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleVisibility = () => {
        setShowPassword(!showPassword);
      };
    return(
        <div className='inputpassword-group'>
            <input style={{ borderColor: props.error ? 'red' : '' }} value={props.value} onChange={props.onChange} className='inputpassworddd'placeholder={props.placeholder} type={showPassword ? "text" : "password"}/>
            <button
                type="button"
                onClick={handleToggleVisibility}
                className="toggle-password"
                >
                {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                    <FontAwesomeIcon icon={faEye} />
                )}
            </button>
        </div>
    )
}