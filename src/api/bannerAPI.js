import axios from "axios";
import { getBaseUrl } from "../utils/baseUrl";

export const fetchBanner = async (data) => {
    const token = localStorage.getItem("ss_token");
    let config = {
        method: "post",
        url: getBaseUrl() + "auth_api/getBanner",
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

export const addBanner = async (obj) => {
    const fd = new FormData();
    fd.append("banner_name", obj.banner_name)
    fd.append("category_name", obj.category_name)
    fd.append("logo_position", obj.logo_position)
    fd.append("banner_image", obj.profilePic)

    let config = {
        method: "post",
        url: getBaseUrl() + "auth_api/addBanner",
        data: fd,
    };

    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const editBanner = async (obj) => {
    const fd = new FormData();
    fd.append("id", obj.id)
    fd.append("banner_name", obj.banner_name)
    fd.append("category_name", obj.category_name)
    fd.append("logo_position", obj.logo_position)
    fd.append("banner_image", obj.profilePic)

    let config = {
        method: "patch",
        url: getBaseUrl() + "auth_api/updateBanner",
        data: fd,
    };

    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteBanner = async (id) => {
    let config = {
        method: "delete",
        url: getBaseUrl() + `auth_api/deleteBanner/${id}`,
    };
    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};