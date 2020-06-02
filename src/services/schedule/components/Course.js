import React from "react";
import "./Course.css";

class Course extends React.Component {
  render() {
    return (
      <div id={this.props.INSTANCEID} className="Course">
        <h4>{this.props.abbr}</h4>
        <p>{this.props.credits} ECTS Credits</p>
        <small>{this.props.school}</small>
      </div>
    );
  }
}

export default Course;

