// import { store } from "../redux/store";
import axios from "axios";
import { BASE_URL } from "./apiUrls";

export const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});
