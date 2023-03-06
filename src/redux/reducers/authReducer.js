import { createSlice, current } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";

const initialState = {
  token: null,
  user: {},
  authButton: "idle",
  profilePicLoader: "idle",
  sideSearch: true,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    resetAuthReducer: () => initialState,
    logout(state, action) {
      localStorage.removeItem("socioPlusToken");
      // state.token = null;
      // state = JSON.parse(JSON.stringify(initialState));
      console.log({ state });
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

export const { logout, setSideSearch, resetAuthReducer } = authReducer.actions;

export default authReducer.reducer;
