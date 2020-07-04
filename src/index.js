// React and React libraries
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Redux store
import store from "./store/configureStore";

// Saving state into localStorage
import { saveState } from "./store/localStorage";
import throttle from "lodash/throttle";

// React components
import App from "./components/App";

// Root styles
import "./index.css";

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
