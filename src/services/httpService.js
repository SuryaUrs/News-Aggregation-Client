import  { api } from '../api/httpCommon/axiosInstance';

export const getRequest = async (url, params = {}, config = {}) => {
    try {
        return await api.get(url, { params, ...config });
    } catch (error) {
        throw error;
    }
};


export const postRequest = async (url, data = {}, config = {}) => { 
    try {
        return await api.post(url, data, config);
    } catch (error) {
        throw error;
    }
};


export const putRequest = async (url, data = {}, config = {}) => {
  try {
    return await api.put(url, data, config);
  } catch (error) {
    throw error;
  }
};


export const deleteRequest = async (url, config = {}) => {
  try {
    return await api.delete(url, config);
  } catch (error) {
    throw error;
  }
};