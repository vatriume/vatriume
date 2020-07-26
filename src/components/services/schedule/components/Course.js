import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Course.css";

import Section from "./Section";

const Course = (props) => {
  const schedules = useSelector((state) => state.services.schedule.schedules);

  const sections = schedules.byId[props.instance];

  const sectionComponents = Object.keys(sections["SECTIONS"]).map((section) => (
    <Section
      key={section}
      id={section}
      sections={sections["SECTIONS"][section]}
    />
  ));

  const [displaying, toggleDisplayStatus] = useState(false);

  return (
    <>
      <div className="Course" id={props.instance}>
        <h4>{props.abbr}</h4>
        <p>{props.title}</p>
        <small>{props.credits} ECTS Credits</small>
        <button
          id={props.instance}
          onClick={(e) => {
            e.preventDefault();
            toggleDisplayStatus((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon="caret-down" />
        </button>
      </div>

      <div className="Sections" id={props.instance + "-sections"}>
        {displaying && sectionComponents}
      </div>
    </>
  );
};

export default Course;
