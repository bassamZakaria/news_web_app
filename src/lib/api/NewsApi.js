import {axiosNews} from '../axios/axiosInstances'
import {apiQueryBuilder, getApiKeyQuery} from "../utils/Helper";
import {cancel, generateCancelTokenSource} from "../axios/axiosHelper";

let token = null;

const cancelPendingRequest = (token) => {
    if (token) {
        cancel(token);
    }
};

export const acquireCancelTokenSource = () => {
    return generateCancelTokenSource(axiosNews);
};


export const getSource = () => axiosNews.get(`sources?${getApiKeyQuery()}`);

export const getAllNews = (page, pageSize, searchKey, startDate, endDate) => {
    cancelPendingRequest(token);
    token = acquireCancelTokenSource();
    const query = apiQueryBuilder(page, pageSize, searchKey, null, null, startDate, endDate);
    return axiosNews.get(`everything?${query}`, {cancelToken: token.token})
};

export const getHeadlines = (page, pageSize, searchKey, sources, countries, startDate, endDate) => {
    cancelPendingRequest(token);
    token = acquireCancelTokenSource();
    const query = apiQueryBuilder(page, pageSize, searchKey, sources, countries, startDate, endDate);
    return axiosNews.get(`top-headlines?${query}`, {cancelToken: token.token})
};

