import { toast } from "react-toastify";
import { API_URLS } from "../config/apiUrls";
import { customAxios } from "../config/customAxios";

export const getSearchUsers = async (payload) => {
  try {
    const res = await customAxios.get(
      API_URLS.getSearchUsers + `?search=${payload.query}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};
export const getChatList = async () => {
  try {
    const res = await customAxios.get(API_URLS.getChatList);
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};
export const getAllMessages = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.getAllMessages, payload);
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};

export const postSendMessage = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postSendMessage, payload);
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};

export const postAccessChat = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postAccessChat, payload);
    return res.data;
  } catch (error) {
    console.log(toast.error(error.message));
  }
};
