import React from "react";
import './messages.css'
import MessagesEntry from "../../../components/messagesEntry/messagesEntry";
export default function Messageslist(props) {

    return(
        <>
        <div className="messages-Container">

            <div className={`messages ${props.isOpen ? "open" : ""}`}>
                
              <div className="rowni">
                <div className="messages-card">
                    <div className="messages-name">Messages</div>
                </div> 
              </div>    
                <MessagesEntry/>
            </div>  
        </div>
        </>
    );
}