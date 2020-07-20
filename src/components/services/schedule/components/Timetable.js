import React from "react";
import "./Timetable.css";

import { useDrop, useDragLayer } from "react-dnd";
import { ItemTypes } from "../Schedule";

const Timetable = () => {
  // Connecting React DnD
  const [collectedProps, drop] = useDrop({
    accept: ItemTypes.SECTION,
    collect: (monitor) => ({
      sectionDragged: monitor.getItem(),
    }),
  });

  // Basic markup
  let timestamps = [];
  let D = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let d = ["M", "T", "W", "R", "F", "S"];
  let days = [];

  for (let i = 9; i <= 20; i++) {
    timestamps.push(
      <div key={i + ":00"} id={i + ":00"}>
        {i + ":00"}
      </div>
    );
  }

  for (const day of D) {
    days.push(
      <div key={day.toLowerCase()} id={day.toLowerCase()}>
        <h3>{day}</h3>
      </div>
    );
  }

  // Drag render functions
  const renderPossible = (sections) => {
    let possibleTimes = [];

    for (const section of sections) {
      const days = section.DAYS.replace(/ /g, "").split("");

      for (const day of days) {
        console.log(day, d.indexOf(day) * 100 + "px");
        possibleTimes.push(
          <div
            key={section.INSTANCEID + "-" + section.ST}
            id={section.INSTANCEID + "-" + section.ST}
            style={{
              position: "absolute",
              top: section.TIMES[0] - 540 + "px",
              left: "calc(100% / 6 * " + d.indexOf(day) + ")",
              width: "calc(100% / 6)",
              height:
                "calc(100% / 12 * " +
                (section.TIMES[1] - section.TIMES[0]) / 60 +
                ")",
              backgroundColor: "var(--accent)",
              borderRadius: "0.5rem",
            }}
          >
            {section.TIMES + " " + section.DAYS}
          </div>
        );
      }
    }

    return possibleTimes;
  };

  return (
    <div className="Timetable">
      <div className="timestamps">{timestamps}</div>
      <div className="table">
        <div className="days">{days}</div>
        <div ref={drop} className="fields">
          {collectedProps.sectionDragged &&
            renderPossible(collectedProps.sectionDragged.sections)}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
