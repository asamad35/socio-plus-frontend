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

export const getChatList = createAsyncThunk(
  "getChatList",
  async (payload, { getState }) => {
    const data = await services.getChatList(payload);
    if (data.data) {
      data.data?.map((el) => {
        el.otherUser = el.users.filter(
          (user) => user._id !== getState().authReducer.user._id
        )[0];

        delete el["users"];
        return el;
      });
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);
