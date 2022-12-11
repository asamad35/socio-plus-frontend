import { combineReducers } from "@reduxjs/toolkit";
import testReducer from "./testReducer";
import testReducer2 from "./testReducer2";

const rootReducer = combineReducers({
  testReducer,
  testReducer2,
});

export default rootReducer;
