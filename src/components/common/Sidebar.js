import React from "react";
import { NavLink } from "react-router-dom";

import "./Sidebar.css";
import ThemeSwitcher from "./ThemeSwitcher";
import SignIn from "./SignIn";

const Sidebar = (props) => {
  return (
    <div className="Sidebar">
      <ul className="navbar">
        <li className="navbar-item">
          <NavLink exact to="/" activeClassName="active">
            <img className="logo" src={props.logo} alt="Home" />
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/schedule" activeClassName="active">
            <img className="logo" src={props.logo} alt="Schedule" />
          </NavLink>
        </li>
        <li className="navbar-item sign-in">
          <SignIn />
        </li>
        <li className="navbar-item theme">
          <ThemeSwitcher />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
