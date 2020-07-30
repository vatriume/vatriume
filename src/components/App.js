import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Assets and data
import logo from "../assets/logo.svg";
import "./App.css";

// Components
import Sidebar from "./common/Sidebar";
import Profile from "./common/Profile/Profile";
import Schedule from "./services/schedule/Schedule";
import Home from "./Home";
import PageNotFound from "./common/404";

// FontAwesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSun,
  faMoon,
  faTimes,
  faPlus,
  faCaretDown,
  faCode,
  faHeart,
  faUser,
  faCalendarWeek,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
library.add(
  faSun,
  faMoon,
  faTimes,
  faPlus,
  faCaretDown,
  faCode,
  faHeart,
  faUser,
  faReact,
  faCalendarWeek,
  faSyncAlt
);

const App = () => {
  return (
    <div className="App">
      <Sidebar logo={logo} />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
