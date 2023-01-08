import { createAsyncThunk } from "@reduxjs/toolkit";
import * as services from "../services";

export const postSignup = createAsyncThunk("postSignup", async (payload) => {
  const data = await services.postSignup(payload);
  console.log(payload, "oooooooooooooooooooo", data);
  return data;
});

export const postLogin = createAsyncThunk("postLogin", async (payload) => {
  const data = await services.postLogin(payload);
  return data;
});

export const postChangeStatus = createAsyncThunk(
  "postChangeStatus",
  async (payload, { getState }) => {
    console.log(getState(), "abcdef", payload);
    const { data } = await services.postChangeStatus(payload);
    console.log(payload, "oooooooooooooooooooo", data);
    return data;
  }
);
