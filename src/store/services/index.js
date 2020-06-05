import { combineReducers } from "redux";

// Services
import scheduleReducer from "./schedule";
import marketReducer from "./market";

export default combineReducers({
  schedule: scheduleReducer,
  market: marketReducer,
});
