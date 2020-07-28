import React from "react";
import { Switch, Route } from "react-router-dom";

// Assets and data
import logo from "../logo.svg";
import "./App.css";

// Components
import Sidebar from "./common/Sidebar";
// import Typography from "./common/Typography";
import Schedule from "./services/schedule/Schedule";
import Home from "./Home";

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
} from "@fortawesome/free-solid-svg-icons";
library.add(faSun, faMoon, faTimes, faPlus, faCaretDown, faCode, faHeart);

const App = () => {
  return (
    <div className="App">
      <Sidebar logo={logo} />
      <Switch>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
