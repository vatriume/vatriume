import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Timetable.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../Schedule";

import SectionTime from "./SectionTime";

const Timetable = () => {
  // Connecting React DnD
  const [{ sectionDragged }] = useDrop({
    accept: ItemTypes.SECTION,
    collect: (monitor) => ({
      sectionDragged: monitor.getItem(),
    }),
  });

  const chosenSections = useSelector(
    (state) => state.firebase.profile.schedule.sections
  );
  const coursesData = useSelector((state) => state.services.schedule.courses);

  // Basic markup
  let dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let timestamps = [];
  let days = [];

  for (let i = 9; i <= 20; i++) {
    timestamps.push(
      <div key={i + ":00"} id={i + ":00"}>
        {i + ":00"}
      </div>
    );
  }

  for (const day of dayNames) {
    days.push(
      <div key={day} id={day}>
        <h3>{day}</h3>
      </div>
    );
  }

  // Drag render functions
  const renderPossible = (sections) => {
    let possibleTimes = [];

    for (const section of sections) {
      const course = section.INSTANCEID;
      possibleTimes.push(
        <SectionTime
          display="available"
          course={coursesData.byId[course].ABBR}
          section={section}
        ></SectionTime>
      );
    }

    return possibleTimes;
  };

  const renderChosen = (sections) => {
    let chosenTimes = [];
    Object.keys(sections).forEach((course) => {
      const n = Object.keys(sections[course]).map((sectionType) => (
        <SectionTime
          display="chosen"
          course={coursesData.byId[course].ABBR}
          section={sections[course][sectionType]}
        ></SectionTime>
      ));
      chosenTimes = [...chosenTimes, ...n];
    });

    return chosenTimes;
  };

  return (
    <div className="Timetable">
      <div className="timestamps">{timestamps}</div>
      <div className="table">
        <div className="days">{days}</div>
        <div className="fields">
          {sectionDragged && renderPossible(sectionDragged.sections)}
          {chosenSections && renderChosen(chosenSections)}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
