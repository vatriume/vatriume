import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

// State components
import servicesReducer from "./services/";
import uiReducer from "./common/ui";

export default combineReducers({
  services: servicesReducer,
  ui: uiReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
