import { combineReducers } from "redux";

// Services
import scheduleReducer from "./schedule";

export default combineReducers({
    schedule: scheduleReducer,
});
