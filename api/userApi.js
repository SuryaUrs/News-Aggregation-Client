import { postRequest, getRequest, putRequest, deleteRequest } from "../services/httpService";
import { USER_API_ENDPOINTS } from "../constants/apiEndpoints";

export const loginUser = ( payload = {}) => {
    return postRequest(USER_API_ENDPOINTS.LOGIN, payload);
};

export const signupUser = ( payload = {}) => {
    return postRequest(USER_API_ENDPOINTS.SIGN_UP, payload);
};

export const getUser = (userId) => {
    return getRequest(USER_API_ENDPOINTS.GET_ + userId);
};

export const getAllUsers = (params = {}) => {
    return getRequest(USER_API_ENDPOINTS.GET, params);
};

export const updateUser = (userId, payload = {}) => {
    return putRequest(USER_API_ENDPOINTS.PUT + userId, payload);
};

export const deleteUser = (userId) => {
    return deleteRequest(USER_API_ENDPOINTS.DELETE + userId);
};