import { combineReducers } from "redux";

// State components
import servicesReducer from "./services/";
import authReducer from "./common/auth";
import uiReducer from "./common/ui";

export default combineReducers({
  services: servicesReducer,
  auth: authReducer,
  ui: uiReducer,
});
