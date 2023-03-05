import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as services from "../services";

export const getSearchUsers = createAsyncThunk(
  "getSearchUsers",
  async (payload) => {
    const data = await services.getSearchUsers(payload);
    if (data.data) {
      // toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);

export const getChatList = createAsyncThunk("getChatList", async (payload) => {
  const data = await services.getChatList(payload);
  if (data.data) {
    return data.data;
  } else {
    toast.error(data.message);
    throw new Error();
  }
});

export const getAllMessages = createAsyncThunk(
  "getAllMessages",
  async (payload) => {
    const data = await services.getAllMessages(payload);
    if (data.data) {
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);

export const postSendMessage = createAsyncThunk(
  "postSendMessage",
  async (payload) => {
    const data = await services.postSendMessage(payload.payload);
    if (data.data) {
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);

export const postAccessChat = createAsyncThunk(
  "postAccessChat",
  async (payload, thunkAPI) => {
    const data = await services.postAccessChat(payload);
    if (data.data) {
      console.log(data, "lllllllllllllll");
      thunkAPI.dispatch(getAllMessages({ chatID: data.data._id }));
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);
