// React and React Libraries
import React, { useEffect } from "react";

// Actions
import {
  coursesFetched,
  schedulesFetched,
} from "../../../store/services/schedule";
import { databaseFetch } from "../../../store/common/database.js";

import store from "../../../store/configureStore";

// React Components
import Selector from "./components/Selector";
// import Menu from "./components/Menu";
// import Timetable from "./components/Timetable";
// import Info from "./components/Info";

// Schedule Component styles
import "./Schedule.css";

// Schedule Component
const Schedule = () => {
  const dispatch = store.dispatch;

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
  }, [dispatch]);

  return (
    <div className="Schedule">
      {
        //chosenCourses.length !== 0 ? (
        <Selector />
        //) : (
        // {/* <DndProvider backend={HTML5Backend}> */}
        // {/* <Menu /> */}
        // {/* <Timetable /> */}
        // {/* <Info /> */}
        // </DndProvider>
      }
    </div>
  );
};

export default Schedule;

// React DnD Draggables and Droppables
export const ItemTypes = {
  SECTION: "section",
};
