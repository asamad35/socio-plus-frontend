import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const testReducer2 = createSlice({
  name: "testReducer2",
  initialState,
  reducers: {
    incrementMyTest(state, action) {
      state.count++;
    },
  },
});

export const { incrementMyTest } = testReducer2.actions;
export default testReducer2.reducer;
