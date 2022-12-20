import axios from "axios";
import { BASE_URL } from "./apiUrls";

export const customAxios = axios.create({ baseURL: BASE_URL });
