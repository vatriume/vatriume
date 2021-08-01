import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Sidebar.css";
import ThemeSwitcher from "./ThemeSwitcher";
import SignIn from "./SignIn";

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <ul className="navbar">
                <li className="navbar-item">
                    <NavLink exact to="/" activeClassName="active">
                        <FontAwesomeIcon icon="home" />
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/schedule" activeClassName="active">
                        <FontAwesomeIcon icon="calendar-week" />
                    </NavLink>
                </li>
                <li className="navbar-item sign-in">
                    <NavLink to="/profile" activeClassName="active">
                        <SignIn />
                    </NavLink>
                </li>
                <li className="navbar-item theme">
                    <ThemeSwitcher />
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
