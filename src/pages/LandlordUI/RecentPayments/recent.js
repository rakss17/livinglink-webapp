import React from "react";
import RecentEntry from "../../../components/recentPayments/recentEntry";
import './recent.css'

export default function Recent(props) {

    return(
        <>
        <div className="Recent-Container">

            <div className={`Recent ${props.isOpen ? "open" : ""}`}>
                
              <div className="rowni">
                <div className="titlecard-Recent">
                    <div className="Recent-name">Name</div>
                    <div className="Recent-name">Date</div>
                </div> 
              </div>    
                 <RecentEntry/>
            </div>
        </div>
        </>
    );
}