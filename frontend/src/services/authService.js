import { toast } from "react-toastify";
import { API_URLS } from "../config/apiUrls";
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
