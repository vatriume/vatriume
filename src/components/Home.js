import React from "react";

import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div className="Home">
      <div className="splash">
        <h1>VΛtriume</h1>
      </div>
      <code>
        <FontAwesomeIcon icon="code" /> with <FontAwesomeIcon icon="heart" /> by{" "}
        <span className="k-logo">K</span>
      </code>
    </div>
  );
};

export default Home;
