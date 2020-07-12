import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Selector.css";
import "./Course.css";

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
  chosenCoursesData.forEach((course) => {
    chosenCoursesFromState.push(course);
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [foundCourses, setFoundCourses] = useState(courses);
  const [chosenCourses, setChosenCourses] = useState(chosenCoursesFromState);

  useEffect(() => {
    setFoundCourses(
      courses
        .filter((course) =>
          course.ABBR.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((course) => !chosenCourses.includes(course))
    );
  }, [searchQuery, chosenCourses]);

  const foundCourseComponents = foundCourses.map((course) => (
    <div key={course.INSTANCEID} className="Course">
      <h4>{course.ABBR}</h4>
      <p>{course.CRECTS} ECTS Credits</p>
      <small>{course.SCHOOL}</small>
      <button
        id={course.INSTANCEID}
        onClick={(e) => {
          const chosen = coursesData.byId[e.currentTarget.id];
          setChosenCourses([...chosenCourses, chosen]);
          setFoundCourses((prev) =>
            prev.filter((course) => course.INSTANCEID !== chosen.INSTANCEID)
          );
        }}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  ));

  const chosenCourseComponents = chosenCourses.map((course) => (
    <div key={course.INSTANCEID} className="Course">
      <h4>{course.ABBR}</h4>
      <p>{course.CRECTS} ECTS Credits</p>
      <small>{course.SCHOOL}</small>
      <button
        id={course.INSTANCEID}
        onClick={(e) => {
          const chosen = coursesData.byId[e.currentTarget.id];
          setChosenCourses((prev) =>
            prev.filter((course) => course !== chosen)
          );
          setFoundCourses([chosen, ...foundCourses]);
        }}
      >
        <FontAwesomeIcon icon="times" />
      </button>
    </div>
  ));

  return (
    <div className="Selector">
      <div className="chosen">{chosenCourseComponents}</div>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          name="available-courses"
          id="available-courses"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="available-courses">{foundCourseComponents}</div>
      </div>
    </div>
  );
};

export default Selector;
