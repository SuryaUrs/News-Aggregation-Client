import { postRequest, getRequest, putRequest } from "../services/httpService";
import { NOTIFICATION_SETTINGS_API_ENDPOINTS } from "../constants/apiEndpoints";

export const getNotificationSettings = async (params) => {
    return getRequest(NOTIFICATION_SETTINGS_API_ENDPOINTS.GET, params);
};

export const getNotificationSettingsById = async (id, include) => {
    return getRequest(NOTIFICATION_SETTINGS_API_ENDPOINTS.GET_ + id, include ? { include } : '');
};

export const updateNotificationSettings = async (id, payload) => {
    return putRequest(NOTIFICATION_SETTINGS_API_ENDPOINTS.PUT + id, payload);
};

export const saveNotificationSettings = async (payload) => {
    return postRequest(NOTIFICATION_SETTINGS_API_ENDPOINTS.POST, payload);
};