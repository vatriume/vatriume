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
    user: {
      id: "",
      chosenCourses: [],
      chosenSections: [],
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
    coursesChosen: (state, action) => {
      state.user.chosenCourses = action.payload;
    },
  },
});

// Actions
export const {
  coursesFetched,
  schedulesFetched,
  coursesChosen,
} = schedule.actions;

// Reducer
export default schedule.reducer;
