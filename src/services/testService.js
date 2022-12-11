import { API_URLS } from "../config/apiUrls";
import { customAxios } from "../config/customAxios";

export const getAllTodos = async (payload) => {
  try {
    const res = await customAxios.get(API_URLS.getAllTodos, payload);
    return res.data;
  } catch (error) {
    alert("Some error occured:", error);
  }
};

export const getTodoById = async (payload) => {
  try {
    const res = await customAxios.get(API_URLS.getTodoById + payload.id);
    return res.data;
  } catch (error) {
    alert("Some error occured:", error);
  }
};
