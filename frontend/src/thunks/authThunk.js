import { createAsyncThunk } from "@reduxjs/toolkit";
// import store from "../redux/store";

import * as services from "../services";
import { toast } from "react-toastify";
export const postSignup = createAsyncThunk("postSignup", async (payload) => {
  const data = await services.postSignup(payload);
  if (data.data) toast.success(data.message);
  else {
    toast.error(data.message);
    throw new Error();
  }
  return data;
});

export const postLogin = createAsyncThunk("postLogin", async (payload) => {
  const data = await services.postLogin(payload);
  if (data.data) toast.success(data.message);
  else {
    toast.error(data.message);
    throw new Error();
  }
  return data;
});

export const postUpdateStatus = createAsyncThunk(
  "postUpdateStatus",
  async (payload, { getState }) => {
    const data = await services.postUpdateStatus({
      ...payload,
      token: getState().authReducer.token,
    });
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
  async (payload, { getState }) => {
    const data = await services.postUpdateName({
      ...payload,
      token: getState().authReducer.token,
    });
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
  async (payload, { getState }) => {
    payload.append("token", getState().authReducer.token);
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
