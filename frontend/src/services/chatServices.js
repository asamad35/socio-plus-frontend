import { API_URLS } from "../config/apiUrls";
import { customAxios } from "../config/customAxios";

export const postChangeStatus = async (payload) => {
  try {
    const res = await customAxios.post(API_URLS.postChangeStatus, payload);
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};

