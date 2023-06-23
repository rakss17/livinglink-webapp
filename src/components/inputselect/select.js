import React from "react";
import './select.css'

export default function Select(props){
    return(
        <div className="selectt">
            <select style={{ borderColor: props.error ? 'red' : '' }} value={props.value} className="select" onChange={props.onChange}>
                <option defaultValue>{props.default}</option>
                <option value={props.valueOption1}>{props.option1}</option>
                <option value={props.valueOption2}>{props.option2}</option>
            </select>
        </div>
        
    )
}