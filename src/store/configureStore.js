import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import database from "./middleware/database";

// Loading from and saving into localStorage
import { loadState } from "./localStorage";

export default configureStore({
    preloadedState: loadState(),
    reducer: rootReducer,
    middleware: [database],
});
