import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";

const initialState = {
  token: "kuch ahi",
  user: null,
  authButton: "idle",
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logout(state, action) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.postSignup.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.authButton = "idle";
      })
      .addCase(thunks.postLogin.pending, (state, action) => {
        state.authButton = "loading";
      })
      .addCase(thunks.postLogin.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.authButton = "idle";
      })
      .addCase(thunks.postLogin.rejected, (state, action) => {
        state.authButton = "idle";
      });
  },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;
