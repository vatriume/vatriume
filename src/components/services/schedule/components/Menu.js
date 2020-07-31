import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import "./styles/Menu.css";

import Course from "./Course";
import Alert from "../../../common/Alert";

const Menu = (props) => {
  const firebase = useFirebase();
  const history = useHistory();

  const profile = useSelector((state) => state.firebase.profile);
  const chosenSchedule = useSelector(
    (state) => state.firebase.profile.schedule
  );

  const [alert, showAlert] = useState(null);

  const saveScheduleToRegister = (schedule) => {
    if (profile.isLoaded && !profile.isEmpty) {
      if (schedule) {
        if (schedule.count < 24 || schedule.count > 36) {
          showAlert(
            <Alert
              deleteAlert={showAlert}
              message="Currently, this app can only register from 24 to 36 ECTS credits"
              type="Warning"
            />
          );
        } else if (profile.role !== "Supporter" && profile.role !== "Admin") {
          firebase.updateProfile({
            schedule: { toRegister: schedule },
          });
          showAlert(
            <Alert
              deleteAlert={showAlert}
              message="Auto registration feature is only available for those who have a Supporter tag. Your schedule has been saved, yet it will not be registered until you donate via link in profile"
              type="Warning"
            />
          );
        } else {
          showAlert(
            <Alert
              deleteAlert={showAlert}
              message="This schedule has been saved successfully and will be automatically registered"
              type="Success"
            />
          );
          firebase.updateProfile({
            schedule: { toRegister: schedule },
          });
        }
      }
    }
  };

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
      <button
        className="btn btn-confirm"
        onClick={() => saveScheduleToRegister(chosenSchedule)}
      >
        Register
      </button>
      <div className="courses">{courseComponents}</div>
      {alert}
    </div>
  );
};

export default Menu;
