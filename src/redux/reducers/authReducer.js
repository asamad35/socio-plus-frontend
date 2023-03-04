import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";

const initialState = {
  token: null,
  user: {
    _id: "63badbc39cb3880c19453d2e",
    firstName: "abdus",
    lastName: "samad",
    email: "abdus@gmail.com",
    status: "I am unstoppable",
    __v: 0,
  },
  authButton: "idle",
  profilePicLoader: "idle",
  sideSearch: false,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logout(state, action) {
      state.token = null;
      localStorage.removeItem("socioPlusToken");
    },
    setSideSearch(state, action) {
      state.sideSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.postSignup.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.authButton = "idle";
      })
      .addCase(thunks.postSignup.pending, (state, action) => {
        state.authButton = "loading";
      })
      .addCase(thunks.postSignup.rejected, (state, action) => {
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
      .addCase(thunks.postLoginWithGoogleDB.pending, (state, action) => {
        state.authButton = "loading";
      })

      .addCase(thunks.postLoginWithGoogleDB.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.authButton = "idle";
      })

      .addCase(thunks.postLoginWithGoogleDB.rejected, (state, action) => {
        state.authButton = "idle";
      })

      .addCase(thunks.postUpdateStatus.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(thunks.postUpdateName.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(thunks.postUpdatePhoto.pending, (state, action) => {
        state.profilePicLoader = "loading";
      })
      .addCase(thunks.postUpdatePhoto.fulfilled, (state, action) => {
        state.user = action.payload;
        state.profilePicLoader = "ideal";
      })
      .addCase(thunks.postUpdatePhoto.rejected, (state, action) => {
        state.profilePicLoader = "ideal";
      });
  },
});

export const { logout, setSideSearch } = authReducer.actions;

export default authReducer.reducer;
