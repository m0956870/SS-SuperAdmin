import axios from "axios";
import { getBaseUrl } from "../utils/baseUrl";

export const fetchAllUsers = async (data) => {
    const token = localStorage.getItem("ss_token");
    let config = {
        method: "get",
        url: getBaseUrl() + "root/user/all",
        headers: { authorization: `Bearer ${token}` },
        data,
    };
    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};