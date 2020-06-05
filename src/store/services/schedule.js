import { createSlice } from "@reduxjs/toolkit";

const schedule = createSlice({
  name: "schedule",
  initialState: {
    courses: {
      byId: {},
      allIds: [],
    },
    schedules: {
      byId: {},
      allIds: [],
    },
  },
  reducers: {
    coursesFetched: (state, action) => {
      state.courses.byId = action.payload;
      state.courses.allIds = Object.keys(action.payload);
    },
    schedulesFetched: (state, action) => {
      state.schedules.byId = action.payload;
      state.schedules.allIds = Object.keys(action.payload);
    },
  },
});

export const { coursesFetched, schedulesFetched } = schedule.actions;
export default schedule.reducer;
