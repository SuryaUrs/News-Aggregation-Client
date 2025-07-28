import { getRequest, putRequest } from '../services/httpService';
import { NEWS_CATEGORY_API_ENDPOINTS } from '../constants/apiEndpoints';

export const getNewsCategories = (params) => {
    return getRequest(NEWS_CATEGORY_API_ENDPOINTS.GET, params);
};

export const getNewsCategory = (id, include) => {
    return getRequest(NEWS_CATEGORY_API_ENDPOINTS.GET_ + id, include);
};

export const updateNewsCatogry = (id, payload) => {
    return putRequest(NEWS_CATEGORY_API_ENDPOINTS.PUT + id, payload);
};