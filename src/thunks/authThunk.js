import { createAsyncThunk } from "@reduxjs/toolkit";
import * as services from "../services";
import { toast } from "react-toastify";

export const postSignup = createAsyncThunk("postSignup", async (payload) => {
  const data = await services.postSignup(payload.data);
  if (data.data) {
    toast.success(data.message);
    localStorage.setItem("socioPlusToken", data.token);
  } else {
    toast.error(data.message);
    throw new Error();
  }
  return data;
});

export const postLogin = createAsyncThunk("postLogin", async (payload) => {
  const data = await services.postLogin(payload.data);
  if (data.data) {
    toast.success(data.message);
    localStorage.setItem("socioPlusToken", data.token);
  } else {
    toast.error(data.message);
    throw new Error();
  }
  return data;
});

export const postLoginWithGoogleDB = createAsyncThunk(
  "postLoginWithGoogleDB",
  async (payload) => {
    console.log("adwdwdw", payload);
    const data = await services.postLoginWithGoogleDB(payload);
    if (data.data) {
      toast.success(data.message);
      localStorage.setItem("socioPlusToken", data.token);
    } else {
      toast.error(data.message);
      throw new Error();
    }
    return data;
  }
);

export const getLoginWithGoogle = createAsyncThunk(
  "getLoginWithGoogle",
  async (payload, thunkAPI) => {
    console.log("dwdniwndiwndndiwn", payload);
    const data = await services.getLoginWithGoogle(payload.tokenResponse);
    if (data.email_verified) {
      thunkAPI.dispatch(
        postLoginWithGoogleDB({
          firstName: data.given_name,
          lastName: data.family_name,
          email: data.email,
          photoUrl: data.picture,
          navigate: payload.navigate,
        })
      );
    } else {
      toast.error(data.message);
      throw new Error();
    }
    return data;
  }
);

export const postUpdateStatus = createAsyncThunk(
  "postUpdateStatus",
  async (payload) => {
    const data = await services.postUpdateStatus(payload);
    if (data.data) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);

export const postUpdateName = createAsyncThunk(
  "postUpdateName",
  async (payload) => {
    const data = await services.postUpdateName(payload);
    if (data.data) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);

export const postUpdatePhoto = createAsyncThunk(
  "postUpdatePhoto",
  async (payload) => {
    const data = await services.postUpdatePhoto(payload);
    if (data.data) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);
