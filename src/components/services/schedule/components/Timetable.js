import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Timetable = () => {
  const schedulesData = useSelector(
    (state) => state.services.schedule.schedules
  );

  return <div className="Timetable"></div>;
};

export default Timetable;
