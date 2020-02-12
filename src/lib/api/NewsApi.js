import {axiosNews} from '../axios/axiosInstances'
import {apiQueryBuilder} from "../utils/Helper";
import {cancel, generateCancelTokenSource} from "../axios/axiosOperations";

let token = null;

const cancelPendingRequest = (token) => {
    if (token) {
        cancel(token);
    }
};

export const acquireCancelTokenSource = () => {
    return generateCancelTokenSource(axiosNews);
};


export const getSource = () => axiosNews.get(`sources?${apiQueryBuilder()}`);

export const getAllNews = (page, pageSize, searchKey, sources) => {
    cancelPendingRequest(token);
    token = acquireCancelTokenSource();
    const query = apiQueryBuilder(page, pageSize, searchKey, sources);
    return axiosNews.get(`everything?${query}`, {cancelToken: token.token})
};

export const getHeadlines = (page, pageSize, searchKey, sources, countries) => {
    cancelPendingRequest(token);
    token = acquireCancelTokenSource();
    const query = apiQueryBuilder(page, pageSize, searchKey, sources, countries);
    return axiosNews.get(`top-headlines?${query}`, {cancelToken: token.token})
};

