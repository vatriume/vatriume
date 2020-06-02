import React from "react";
import "./Menu.css";

import Course from "./Course";

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { coursesData } = this.props;

    let courses = [];
    for (const instance in coursesData) {
      courses.push(coursesData[instance]);
    }

    const courseComponents = courses.map((course) => (
      <Course
        id={course.COURSEID}
        key={course.INSTANCEID}
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
  }
}

export default Menu;
