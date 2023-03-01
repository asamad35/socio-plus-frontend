import axios from "axios";
import { BASE_URL } from "./apiUrls";
// import store from "../redux/store";

// console.log("hi", store);

axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("socioPlusToken") ?? null;

export const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.request.use(
  (config) => {
    if (config?.data && config?.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    const token = localStorage.getItem("socioPlusToken") ?? null;
    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// customAxios.interceptors.response.use(
//   function (response) {
//     console.log(document.cookie, "nnnnnnnnnnnnnnn");
//     console.log({ response }, "mmmmmmmmmmmmmmmmm");
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
