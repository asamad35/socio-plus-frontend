import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";
const initialState = {
  count: 0,
};

const testReducer = createSlice({
  name: "testReducer",
  initialState,
  reducers: {
    increment(state, action) {
      state.count++;
    },
    decrement(state, action) {
      state.count--;
    },
    incrementByValue(state, action) {
      state.count = action.payload.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.getAllTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(thunks.getAllTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(thunks.getTodoById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(thunks.getTodoById.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      });
  },
});

export const { increment, decrement, incrementByValue } = testReducer.actions;
export default testReducer.reducer;
