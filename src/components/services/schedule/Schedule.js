// React and React Libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, Redirect, Switch } from "react-router-dom";
import Loader from "react-loader-spinner";

// Actions
import {
  coursesFetched,
  schedulesFetched,
} from "../../../store/services/schedule";
import { databaseFetch } from "../../../store/common/database.js";

// React Components
import Selector from "./components/Selector";
import Menu from "./components/Menu";
import Timetable from "./components/Timetable";
import Info from "./components/Info";

// Schedule Component styles
import "./Schedule.css";
import { useFirebase } from "react-redux-firebase";

// Schedule Component
const Schedule = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const userData = useSelector((state) => state.firebase.profile.schedule);
  let chosenCoursesData = [];
  let chosenCoursesECTSData = 0;
  let daysNum = 6;

  if (userData) {
    chosenCoursesData = userData.courses;
    chosenCoursesECTSData = userData.count;
    daysNum = userData.daysNum;
  }

  useEffect(() => {
    dispatch(
      databaseFetch({
        request: "services/schedule/courses",
        onSuccess: coursesFetched.type,
        onFailure: "console.error",
      })
    );

    dispatch(
      databaseFetch({
        request: "services/schedule/schedules",
        onSuccess: schedulesFetched.type,
        onFailure: "console.error",
      })
    );
  }, []);

  useEffect(() => {
    if (profile.isLoaded && !profile.isEmpty)
      if (profile.schedule === undefined)
        firebase.updateProfile({
          schedule: {
            count: 0,
            daysNum: 6,
            courses: [],
            sections: {},
          },
        });
  }, [profile]);

  return (
    <div className="Schedule">
      <Switch>
        <Route exact path="/schedule">
          {profile.isLoaded && !profile.isEmpty ? (
            chosenCoursesData.length !== 0 ? (
              <>
                <Menu chosenCourses={chosenCoursesData} />
                <Timetable daysNum={daysNum} />
                <Info />
              </>
            ) : (
              <Redirect to="/schedule/select" />
            )
          ) : (
            <div className="loader">
              <Loader
                type="Puff"
                color="var(--accent)"
                width="4rem"
                height="4rem"
                timeout={600000}
              />
            </div>
          )}
        </Route>
        <Route exact path="/schedule/select">
          <Selector />
        </Route>
      </Switch>
    </div>
  );
};

export default Schedule;

// React DnD Draggables and Droppables
export const ItemTypes = {
  SECTION: "section",
};
