import React from "react";
import { useDrop } from "react-dnd";

import { ItemTypes } from "../Schedule";

const SectionTime = (props) => {
  // Connecting React DnD
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.SECTION,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const section = props.section;
  const id = section.INSTANCEID + "-" + section.ST;
  const d = ["M", "T", "W", "R", "F", "S"];
  const days = section.DAYS.replace(/ /g, "").split("");
  let sectionTime = [];

  for (const day of days) {
    const id = section.INSTANCEID + "-" + section.ST + "-" + day;
    const style = {
      position: "absolute",
      top:
        "calc(100% / 12 * " + (section["FORMATTED TIMES"][0] - 540) / 60 + ")",
      left: "calc(100% / 6 * " + d.indexOf(day) + ")",
      width: "calc(100% / 6)",
      height:
        "calc(100% / 12 * " +
        (section["FORMATTED TIMES"][1] - section["FORMATTED TIMES"][0]) / 60 +
        ")",
      backgroundColor: isOver ? "var(--text)" : "var(--select-hover)",
      borderRadius: "0.5rem",
    };

    sectionTime.push(
      <div key={id} id={id} style={style}>
        <p>{section["TIMES"]}</p>
      </div>
    );
  }

  return (
    <div id={id} key={id} ref={drop} className="section-display">
      {sectionTime}
    </div>
  );
};

export default SectionTime;
