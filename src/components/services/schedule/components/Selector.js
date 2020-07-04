import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Selector.css";

const Selector = () => {
  const coursesData = useSelector((state) => state.services.schedule.courses);
  const chosenCoursesData = useSelector(
    (state) => state.services.schedule.user.chosenCourses
  );

  let courses = [];
  coursesData.allIds.forEach((INSTANCEID) => {
    courses.push(coursesData.byId[INSTANCEID]);
  });

  let chosenCoursesFromState = [];
  chosenCoursesData.forEach((INSTANCEID) => {
    chosenCoursesFromState.push(coursesData.byId[INSTANCEID]);
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [foundCourses, setFoundCourses] = useState(courses);
  const [chosenCourses, setChosenCourses] = useState(chosenCoursesFromState);

  useEffect(() => {
    setFoundCourses(
      courses.filter((course) =>
        course.ABBR.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, courses]);

  const chosenCourseComponents = chosenCourses.map((course) => (
    <div key={course.INSTANCEID} className="Course">
      <h4>{course.ABBR}</h4>
      <p>{course.CRECTS} ECTS Credits</p>
      <small>{course.SCHOOL}</small>
      <button>
        <FontAwesomeIcon icon="times" />
      </button>
    </div>
  ));

  const foundCourseComponents = foundCourses.map((course) => (
    <div key={course.INSTANCEID} className="Course">
      <h4>{course.ABBR}</h4>
      <p>{course.CRECTS} ECTS Credits</p>
      <small>{course.SCHOOL}</small>
      <button
        id={course.INSTANCEID}
        onClick={(e) => {
          console.log("Button pressed");
          console.log("Button id:", e.target.id);
          console.log("Chosen courses:", chosenCourses);
          chosenCourses.push(coursesData.byId[e.target.id]);
          console.log("Chosen courses:", chosenCourses);
        }}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  ));

  return (
    <div className="Selector">
      <div className="chosen">{chosenCourseComponents}</div>
      <div className="search">
        <input
          type="text"
          name="available-courses"
          id="available-courses"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {foundCourseComponents}
      </div>
    </div>
  );
};

export default Selector;
