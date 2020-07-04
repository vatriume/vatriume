import React from "react";
import "./Course.css";

import { ItemTypes } from "../Schedule";
import { useDrag } from "react-dnd";

const Course = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SECTION },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className="Course"
      id={props.INSTANCEID}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1.0,
      }}
    >
      <h4>{props.abbr}</h4>
      <p>{props.credits} ECTS Credits</p>
      <small>{props.school}</small>
    </div>
  );
};

export default Course;
