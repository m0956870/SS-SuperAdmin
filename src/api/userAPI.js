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

export const addUser = async (obj) => {
    const fd = new FormData();
    fd.append("first_name", obj.first_name)
    fd.append("last_name", obj.last_name)
    fd.append("phone_number", obj.phone_number)
    fd.append("email", obj.email)
    fd.append("password", obj.password)
    fd.append("image", obj.image)
    fd.append("permissions", JSON.stringify(obj.permissions));

    const token = localStorage.getItem("ss_token");
    let config = {
        method: "post",
        url: getBaseUrl() + "root/user/create_user",
        headers: { authorization: `Bearer ${token}` },
        data: fd,
    };
    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateUser = async (obj, type) => {
    const fd = new FormData();
    if (type === "password") {
        fd.append("_id", obj._id);
        fd.append("password", obj.password);
        fd.append("oldPassword", obj.oldPassword);
    } else {
        fd.append("_id", obj._id);
        fd.append("permissions", JSON.stringify(obj.permissions));
    }

    const token = localStorage.getItem("ss_token");
    let config = {
        method: "patch",
        url: getBaseUrl() + "root/user",
        headers: { authorization: `Bearer ${token}` },
        data: fd,
    };
    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};