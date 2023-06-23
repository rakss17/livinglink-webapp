import React from "react";
import './missedPayments.css'
import MissedPaymentsEntry from "../../../components/missedPaymentsEntry/missedPaymentsEntry";
export default function MissedPaymentsList(props) {

    return(
        <>
        <div className="missed-Container">

            <div className={`missedlist ${props.isOpen ? "open" : ""}`}>
                
              <div className="rowni">
                <div className="titlecard-missed">
                    <div className="missed-name">Name</div>
                    <div className="missed-name">Due Date</div>
                    <div className="missed-name">To pay</div>
                </div> 
              </div>    
                 <MissedPaymentsEntry/>
            </div>
        </div>
        </>
    );
}