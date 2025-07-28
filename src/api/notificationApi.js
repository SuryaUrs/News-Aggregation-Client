import { getRequest, putRequest } from "../services/httpService";
import { NOTIFICATION_API_ENDPOINTS } from "../constants/apiEndpoints";

export const getNotifications = (params = {}) => {
    return getRequest(NOTIFICATION_API_ENDPOINTS.GET, params);
};

export const getNotification = (notificationId, include) => {
    return getRequest(NOTIFICATION_API_ENDPOINTS.GET_ + notificationId, include ? { include } : '');
};

export const updateNotification = (notificationId, payload = {}) => {
    return putRequest(NOTIFICATION_API_ENDPOINTS.PUT + notificationId, payload);
};