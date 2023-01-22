import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as services from "../services";

export const getSearchUsers = createAsyncThunk(
  "getSearchUsers",
  async (payload, { getState }) => {
    const data = await services.getSearchUsers({
      ...payload,
    });
    if (data.data) {
      // toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      throw new Error();
    }
  }
);
