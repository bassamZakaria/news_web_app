import {axiosNews} from '../axios/axiosInstances'
import {apiQueryBuilder, getApiKeyQuery} from "../utils/Helper";
import {cancel, generateCancelTokenSource} from "../axios/axiosOperations";

const cancelPendingRequest = (token) => {
    if (token) {
        debugger;
        cancel(token);
    }
};

export const acquireCancelTokenSource = () => {
    return generateCancelTokenSource(axiosNews);
};


export const getSource = () => axiosNews.get(`sources?${getApiKeyQuery()}`);

export const getAllNews = (token, newToken, page, pageSize, searchKey, sources, startDate, endDate) => {
    cancelPendingRequest(token);
    const query = apiQueryBuilder(page, pageSize, searchKey, sources, startDate, endDate);
    return axiosNews.get(`everything?${query}`, {cancelToken: newToken.token})
};

export const getHeadlines = (token, newToken, page, pageSize, searchKey, sources, countries, startDate, endDate) => {
    cancelPendingRequest(token);
    const query = apiQueryBuilder(page, pageSize, searchKey, sources, countries, startDate, endDate);
    return axiosNews.get(`top-headlines?${query}`, {cancelToken: newToken.token})
};

