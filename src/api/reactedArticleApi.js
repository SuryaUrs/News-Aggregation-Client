import { getRequest, putRequest, postRequest } from "../services/httpService";
import { REACTION_API_ENDPOINTS } from "../constants/apiEndpoints";

export const saveReactedArticle = (payload) => {
    return postRequest(REACTION_API_ENDPOINTS.POST, payload);
};

export const getReactedArticles = (params = {}) => {
    return getRequest(REACTION_API_ENDPOINTS.GET, params);
};

export const updateReactedArticle = (reactionId, payload = {}) => {
    return putRequest(REACTION_API_ENDPOINTS.PUT + reactionId, payload);
};