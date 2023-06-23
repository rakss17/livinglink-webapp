import React from "react";
import './myTenants.css'
import Tenants from "../../../components/TenantEntry/tenants";
export default function Tenantlist(props) {

    return(
        <>
        <div className="Tenantlist-Container">

            <div className={`Tenantlist ${props.isOpen ? "open" : ""}`}>
                
              <div className="rowni">
                <div className="titlecard">
                    <div className="name">Name</div>
                    <div className="name">Room Number</div>
                </div> 
              </div>    
                 <Tenants/>
            </div>
        </div>
        </>
    );
}