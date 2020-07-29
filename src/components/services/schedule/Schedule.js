// React and React Libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  if (userData) {
    chosenCoursesData = userData.courses;
    chosenCoursesECTSData = userData.count;
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
            courses: [],
            sections: {},
          },
        });
  }, [profile]);

  return (
    <div className="Schedule">
      {chosenCoursesData.length !== 0 ? (
        <>
          <Menu chosenCourses={chosenCoursesData} />
          <Timetable />
          <Info />
        </>
      ) : (
        <Selector />
      )}
    </div>
  );
};

export default Schedule;

// React DnD Draggables and Droppables
export const ItemTypes = {
  SECTION: "section",
};
