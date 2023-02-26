import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  authReducer,
  chatReducer,
});

export default rootReducer;
