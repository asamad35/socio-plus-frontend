import { createAsyncThunk } from "@reduxjs/toolkit";
import * as services from "../services";
import { toast } from "react-toastify";

export const postSignup = createAsyncThunk("postSignup", async (payload) => {
  const data = await services.postSignup(payload);
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
  const data = await services.postLogin(payload);
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
    console.log("dwdniwndiwndndiwn");
    const data = await services.getLoginWithGoogle(payload);
    if (data.email_verified) {
      thunkAPI.dispatch(
        postLoginWithGoogleDB({
          firstName: data.given_name,
          lastName: data.family_name,
          email: data.email,
          photoUrl: data.picture,
        })
      );
    } else {
      toast.error(data.message);
      throw new Error();
    }
    return data;
  }
);
// email: "samad.abdus3535@gmail.com";
// email_verified: true;
// family_name: "Samad 03";
// given_name: "Abdus";
// locale: "en";
// name: "Abdus Samad 03";
// picture: "https://lh3.googleusercontent.com/a/AGNmyxbyLVXhSCvOTNe6mZaqdIpS4PlStuEObsF4MayN=s96-c";
// sub: "106328584180974737963";

export const postLogoutWithGoogle = createAsyncThunk(
  "postLogoutWithGoogle",
  async () => {
    const data = await services.postLogoutWithGoogle();
    if (data.data) {
      toast.success(data.message);
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
