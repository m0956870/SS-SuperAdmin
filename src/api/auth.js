import axios from "axios";
import { getBaseUrl } from "../utils/baseUrl";

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  try {
    var config = {
      method: "get",
      url: getBaseUrl() + "auth_api/getadminprofile",
      headers: { authorization: `Bearer ${token}` },
    };

    return await axios(config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};