import React, { useState } from "react";
import { Link } from "react-router-dom";
import toggleicon from "../images/icons/toggleicon.png";
import "./styles.css";
import settingsicon from "../images/icons/settings.png";
import messageicon from "../images/icons/message-icon.png";
import notificon from "../images/icons/notification-icon.png";

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!props.isOpen);
  };
  const links = {
    itemtop: [
      { id: 1, name: "Message", icon: messageicon },
      { id: 2, name: "Notification", icon: notificon },
    ],
    items: [
      {
        id: 1,
        name: props.name1,
        icon: props.icon1,
        path: props.path1,
      },
      { id: 1, name: props.name2, icon: props.icon2, path: props.path2 },
      { id: 2, name: props.name3, icon: props.icon3, path: props.path3 },
      { id: 3, name: props.name4, icon: props.icon4, path: props.path4 },
      { id: 4, name: props.name5, icon: props.icon5, path: props.path5 },
    ],
    itembottom: [{ id: 1, name: "Settings", icon: settingsicon }],
  };
  return (
    <div className={`sidebar ${props.isOpen ? "open" : ""}`}>
      <div className="toggle">
        <div className="toggleheader">
          <div className="usertype">
            <p>{props.usertype}</p>
          </div>

          <button className="buttontoggle" onClick={props.handleToggle}>
            <img src={toggleicon}></img>
          </button>
        </div>
        <div className="messangenotif">
          <ul className="messangenotif ul">
            {links.itemtop.map((item) => (
              <li className="messangenotif li" key={item.id}>
                {props.isOpen ? (
                  <>
                    <button className="messagebutton">
                      <img src={item.icon} />
                      {item.name}
                    </button>
                  </>
                ) : (
                  <p></p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="iconss">
          <ul>
            {links.items.map((item) => (
              <li key={item.id}>
                {props.isOpen ? (
                  <Link to={item.path}>
                    <button className="itemsnamebutton">{item.name}</button>
                  </Link>
                ) : (
                  <Link to={item.path}>
                    <button className="buttonicons">
                      <img src={item.icon} />
                    </button>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="settings">
          <ul>
            {links.itembottom.map((item) => (
              <li key={item.id}>
                {props.isOpen ? (
                  <div className="margintop">
                    <button className="itemsnamebuttonn">{item.name}</button>
                  </div>
                ) : (
                  <button className="buttoniconss">
                    <img src={settingsicon} alt="settings" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
