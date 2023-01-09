import { createAsyncThunk } from "@reduxjs/toolkit";
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
