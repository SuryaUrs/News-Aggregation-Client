import { postRequest, getRequest, putRequest } from "../services/httpService";
import { EXTERNAL_SERVER_API_ENDPOINTS } from "../constants/apiEndpoints";

export const saveExternalServer = (payload) => {
    return postRequest(EXTERNAL_SERVER_API_ENDPOINTS.POST, payload);
};

export const getExternalServers = (params) => {
    return getRequest(EXTERNAL_SERVER_API_ENDPOINTS.GET, params);
};

export const getExternalServer = (id, include) => {
    return getRequest(EXTERNAL_SERVER_API_ENDPOINTS.GET_ + id, include ? { include } : '');
};

export const updateExternalServer = (id, payload) => {
    return putRequest(EXTERNAL_SERVER_API_ENDPOINTS.PUT + id, payload);
};