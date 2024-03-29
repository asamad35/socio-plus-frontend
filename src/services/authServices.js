import axios from "axios";
import { API_URLS, googleUserInfoData } from "../config/apiUrls";
import { customAxios } from "../config/customAxios";

export const postSignup = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postSignup, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postLogin = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postLogin, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postLoginWithGoogleDB = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postLoginWithGoogleDB, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getLoginWithGoogle = async (payload) => {
  try {
    const res = await axios.get(googleUserInfoData, {
      headers: { Authorization: `Bearer ${payload.access_token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postUpdateStatus = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postUpdateStatus, payload);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postUpdateName = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postUpdateName, payload);
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};

export const postUpdatePhoto = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postUpdatePhoto, payload);
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};
