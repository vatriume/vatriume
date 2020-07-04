// React and React Libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

// Schedule Component
const Schedule = () => {
  const dispatch = useDispatch();
  const chosenCourses = useSelector(
    (state) => state.services.schedule.user.chosenCourses
  );

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
