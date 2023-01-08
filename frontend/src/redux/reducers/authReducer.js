import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";

const initialState = {
  token: "null",
  // user: null,
  user: {
    _id: "63badbc39cb3880c19453d2e",
    firstName: "abdus",
    lastName: "samad",
    email: "abdus@gmail.com",
    status: "I am unstoppable",
    __v: 0,
  },
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
      })
      .addCase(thunks.postChangeStatus.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;
