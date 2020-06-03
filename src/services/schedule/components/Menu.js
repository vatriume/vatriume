import React from "react";
import "./Menu.css";

import Course from "./Course";

const Menu = (props) => {
  const { coursesData } = props;

  let courses = [];
  for (const instance in coursesData) {
    courses.push(coursesData[instance]);
  }

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

  return <div className="Menu">{courseComponents}</div>;
};

export default Menu;
