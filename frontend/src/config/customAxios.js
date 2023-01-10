import axios from "axios";
import { BASE_URL } from "./apiUrls";
import store from "../redux/store";

// console.log(store, "tttttttttttttttttttttttt");

export const customAxios = axios.create({ baseURL: BASE_URL });
