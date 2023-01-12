import { API_URLS } from "../config/apiUrls";
import { customAxios } from "../config/customAxios";

export const getSearchUsers = async (payload) => {
  try {
    const res = await customAxios.post(
      API_URLS.getSearchUsers + `?search=${payload.query}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("Some error occured:", error);
  }
};
