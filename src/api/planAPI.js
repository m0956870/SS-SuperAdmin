import axios from "axios";
import { getBaseUrl } from "../utils/baseUrl";

export const fetchPlan = async (data) => {
    const token = localStorage.getItem("ss_token");
    let config = {
        method: "get",
        url: getBaseUrl() + "root/plan",
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

export const addPlan = async (data) => {
    let config = {
        method: "post",
        url: getBaseUrl() + "root/plan",
        data,
    };
    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const editPlan = async (data) => {
    let config = {
        method: "patch",
        url: getBaseUrl() + "root/plan",
        data,
    };
    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deletePlan = async (id) => {
    let config = {
        method: "delete",
        url: getBaseUrl() + `root/plan/${id}`,
    };
    try {
        return await axios(config);
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


// purchased plan
export const getPruchasedPlan = async (data) => {
    const token = localStorage.getItem("ss_token");
    let config = {
        method: "post",
        url: getBaseUrl() + "root/plan/purchased_plan",
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