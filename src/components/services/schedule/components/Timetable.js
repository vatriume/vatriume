import React from "react";
import "./Timetable.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../Schedule";

import SectionTime from "./SectionTime";

const Timetable = () => {
  // Connecting React DnD
  const [{ sectionDragged, isOver }] = useDrop({
    accept: ItemTypes.SECTION,
    collect: (monitor) => ({
      sectionDragged: monitor.getItem(),
    }),
  });

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
      possibleTimes.push(<SectionTime section={section}></SectionTime>);
    }

    return possibleTimes;
  };

  return (
    <div className="Timetable">
      <div className="timestamps">{timestamps}</div>
      <div className="table">
        <div className="days">{days}</div>
        <div className="fields">
          {sectionDragged && renderPossible(sectionDragged.sections)}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
