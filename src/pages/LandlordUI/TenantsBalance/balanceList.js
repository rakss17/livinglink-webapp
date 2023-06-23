import React from "react";
import './balanceList.css'
import Balance from "../../../components/tenantsBalance/Balance";
export default function Balancelist(props) {

    return(
        <>
        <div className="Balancelist-Container">

            <div className={`Balancelist ${props.isOpen ? "open" : ""}`}>
                
              <div className="rowni">
                <div className="titlecard-balance">
                    <div className="balance-name">Tenant Name</div>
                    <div className="balance-name">To Pay</div>
                </div> 
              </div>    
                 <Balance/>
            </div>
        </div>
        </>
    );
}