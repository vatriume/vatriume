import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import database from "./middleware/database";

export default configureStore({
  reducer: rootReducer,
  middleware: [database],
});
