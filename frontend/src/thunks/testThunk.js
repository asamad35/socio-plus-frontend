import { createAsyncThunk } from "@reduxjs/toolkit";
import * as services from "../services";

export const getAllTodos = createAsyncThunk("getAllTodos", async () => {
  const data = await services.getAllTodos();
  return data;
});

export const getTodoById = createAsyncThunk("getTodoById", async (payload) => {
  const data = await services.getTodoById(payload);
  return data;
});
