import { postRequest, getRequest, deleteRequest } from "../services/httpService";
import { SAVED_ARTICLE_API_ENDPOINTS } from "../constants/apiEndpoints";

export const saveArticle = (payload = {}) => {
    return postRequest(SAVED_ARTICLE_API_ENDPOINTS.POST, payload);
};

export const getSavedArticles = (params = {}) => {
    return getRequest(SAVED_ARTICLE_API_ENDPOINTS.GET, params);
};

export const deleteSavedArticle = (articleId) => {
    return deleteRequest(SAVED_ARTICLE_API_ENDPOINTS.DELETE + articleId);
}