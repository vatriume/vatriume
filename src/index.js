// React and React libraries
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import { createFirestoreInstance } from "redux-firestore";

// Firebase app
import firebase from "./firebase";

// Redux store
import store from "./store/configureStore";

// Saving state into localStorage
import { saveState } from "./store/localStorage";
import throttle from "lodash/throttle";

// React components
import App from "./components/App";

// Root styles
import "./index.css";

// Storing the local state to localStorage
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

// Binding Firebase to React and Redux
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
