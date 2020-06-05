import { combineReducers } from "redux";

// State components
import servicesReducer from "./services/";
import authReducer from "./auth";
import uiReducer from "./ui";

export default combineReducers({
  services: servicesReducer,
  auth: authReducer,
  ui: uiReducer,
});
