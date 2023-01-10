import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

export default store;
