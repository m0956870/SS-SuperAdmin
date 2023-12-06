import axios from "axios";
import { getBaseUrl } from "../utils/baseUrl";

export const getCompany = async (data) => {
    const token = localStorage.getItem("ss_token");
    let config = {
        method: "post",
        url: getBaseUrl() + "root/company",
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

export const getCompanyListing = async (data) => {
    const token = localStorage.getItem("ss_token");
    let config = {
        method: "post",
        url: getBaseUrl() + "root/company/company_listing",
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

export const updateProfile = async (data) => {
    const token = localStorage.getItem("ss_token");
    try {
        var config = {
            method: "post",
            url: getBaseUrl() + "auth_api/updateProfile",
            headers: { authorization: `Bearer ${token}` },
            data,
        };
        return await axios(config);
    } catch (error) {
        console.log(error);
    }
};

// export const addPlan = async (data) => {
//     let config = {
//         method: "post",
//         url: getBaseUrl() + "root/plan",
//         data,
//     };
//     try {
//         return await axios(config);
//     } catch (error) {
//         console.log(error);
//         return error.response;
//     }
// };

// export const editPlan = async (data) => {
//     let config = {
//         method: "patch",
//         url: getBaseUrl() + "root/plan",
//         data,
//     };
//     try {
//         return await axios(config);
//     } catch (error) {
//         console.log(error);
//         return error.response;
//     }
// };

// export const deletePlan = async (id) => {
//     let config = {
//         method: "delete",
//         url: getBaseUrl() + `root/plan/${id}`,
//     };
//     try {
//         return await axios(config);
//     } catch (error) {
//         console.log(error);
//         return error.response;
//     }
// };