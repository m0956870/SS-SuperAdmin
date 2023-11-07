import axios from "axios";
import { getBaseUrl } from "../utils/baseUrl";

export const getProfile = async () => {
  const token = localStorage.getItem("ss_token");
  let config = {
    method: "get",
    url: getBaseUrl() + "root/user/details",
    headers: { authorization: `Bearer ${token}` },
  };
  try {
    return await axios(config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const userLogin = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl() + "root/user/login",
    data,
  };
  try {
    return await axios(config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};