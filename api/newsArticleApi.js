import { getRequest, putRequest } from "../services/httpService";
import { NEWS_ARTICLE_API_ENDPOINTS } from "../constants/apiEndpoints";

export const getNewsArticleById = (articleId, include) => {
    return getRequest(NEWS_ARTICLE_API_ENDPOINTS.GET_ + articleId, include ? { include } : '');
};

export const updateNewsArticle = (articleId, payload = {}) => {
    return putRequest(NEWS_ARTICLE_API_ENDPOINTS.PUT + articleId, payload);
};

export const getNewsArticlesOData = (params = {}) => {
    return getRequest(NEWS_ARTICLE_API_ENDPOINTS.ODATA, params);
};

export const getPersonalizedNewsArticles = (params = {}) => {
    return getRequest(NEWS_ARTICLE_API_ENDPOINTS.PERSONALIZED, params);
};