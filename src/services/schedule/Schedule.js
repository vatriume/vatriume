import React, { useEffect } from "react";

import "./Schedule.css";

import store from "../../store/configureStore";
import {
  coursesFetched,
  schedulesFetched,
} from "../../store/services/schedule";
import * as actions from "../../store/database.js";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Menu from "./components/Menu";
import Timetable from "./components/Timetable";
import Info from "./components/Info";

// Schedule Component
const Schedule = () => {
  useEffect(() => {
    store.dispatch(
      actions.databaseFetch({
        request: "services/schedule/courses",
        onSuccess: coursesFetched.type,
        onFailure: "console.error",
      })
    );

    store.dispatch(
      actions.databaseFetch({
        request: "services/schedule/schedules",
        onSuccess: schedulesFetched.type,
        onFailure: "console.error",
      })
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="Schedule">
        <Menu />
        <Timetable />
        <Info />
      </div>
    </DndProvider>
  );
};

export default Schedule;
export const ItemTypes = {
  SECTION: "section",
};
