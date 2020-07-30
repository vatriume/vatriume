import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./styles/Menu.css";

import Course from "./Course";

const Menu = (props) => {
  const history = useHistory();

  const coursesData = useSelector((state) => state.services.schedule.courses);

  let courses = [];
  props.chosenCourses.forEach((INSTANCEID) => {
    courses.push(coursesData.byId[INSTANCEID]);
  });

  const courseComponents = courses.map((course) => (
    <Course
      key={course.INSTANCEID}
      id={course.COURSEID}
      instance={course.INSTANCEID}
      abbr={course.ABBR}
      title={course.TITLE}
      credits={course.CRECTS}
      school={course.SCHOOL}
      prereq={course.PREREQ}
      coreq={course.COREQ}
      antireq={course.ANTIREQ}
    />
  ));

  return (
    <div className="Menu">
      <button
        className="btn btn-common"
        onClick={() => history.push("/schedule/select")}
      >
        Reselect
      </button>
      {courseComponents}
    </div>
  );
};

export default Menu;
