import { getRequest, postRequest } from '../services/httpService';
import { REPORTED_ARTICLE_API_ENDPOINTS } from '../constants/apiEndpoints';

export const getAllReportedArticles = (params) => {
    return getRequest(REPORTED_ARTICLE_API_ENDPOINTS.GET, params);
};

export const getReportedArticle = (id, include) => {
    return getRequest(REPORTED_ARTICLE_API_ENDPOINTS.GET_ + id, include ? { include } : '');
};

export const reportArticle = (payload) => {
    return postRequest(REPORTED_ARTICLE_API_ENDPOINTS.POST, payload);
};