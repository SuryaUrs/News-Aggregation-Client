export const USER_API_ENDPOINTS = {
    LOGIN: '/user/login',
    SIGN_UP: '/user/signup',
    GET_: '/user/',
    GET: '/user',
    DELETE: '/user/',
    PUT: '/user/',
};

export const SAVED_ARTICLE_API_ENDPOINTS = {
    POST: '/savedarticle',
    GET: '/savedarticle',
    DELETE: '/savedarticle/',
};

export const REPORTED_ARTICLE_API_ENDPOINTS = {
    POST: '/reportedarticle',
    GET: '/reportedarticle',
    PUT: '/reportedarticle/',
    GET_: '/reportedarticle/',
};

export const REACTION_API_ENDPOINTS = {
    POST: '/reaction',
    GET: '/reaction',
    PUT: '/reaction/',
    GET_: '/reaction/',
};


export const NOTIFICATION_SETTINGS_API_ENDPOINTS = {
    GET: '/notificationsetting',
    PUT: '/notificationsetting/',
    GET_: '/notificationsetting/',
    POST: '/notificationsetting',
}; 

export const NOTIFICATION_API_ENDPOINTS = {
    GET: '/notification',
    GET_: '/notification/',
    PUT: '/notification/',
};

export const NEWS_CATEGORY_API_ENDPOINTS = {
    GET: '/newscategory',
    GET_: '/newscategory/',
    POST: '/newscategory',
    PUT: '/newscategory/',
};

export const NEWS_ARTICLE_API_ENDPOINTS = {
    GET: '/newsarticle',
    GET_: '/newsarticle/',
    PUT: '/newsarticle/',
    ODATA: '/newsarticle/odata',
    PERSONALIZED: '/newsarticle/personalized',
};

export const EXTERNAL_SERVER_API_ENDPOINTS = {
    GET: '/externalserver',
    GET_: '/externalserver/',
    POST: '/externalserver',
    PUT: '/externalserver/',   
};


export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  PROFILE: '/profile',
  NEWS_ARTICLES: '/news-articles',
  SAVED_ARTICLES: '/saved-articles',
  NOTIFICATIONS: '/notifications',
  EXTERNAL_SERVER: '/external-server',
  CATEGORY_SETTINGS: '/category-settings',
  ADMIN_SETTINGS: '/admin-settings',
  USER_SETTINGS: '/user-settings',
  REPORTED_ARTICLES: '/reported-articles',
  REACTED_ARTICLES: '/reacted-articles',
  ERROR_404: '*',
};