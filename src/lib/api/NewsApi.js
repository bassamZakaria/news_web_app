import {axiosNews} from '../axios/axiosInstances'
import {apiQueryBuilder} from "../utils/Helper";

export const getSource = () => axiosNews.get(`sources?${apiQueryBuilder()}`);

export const getAllNews = (page, pageSize, searchKey, sources) => {
    const query = apiQueryBuilder(page, pageSize, searchKey, sources);
    return axiosNews.get(`everything?${query}`)
};

export const getHeadlines = (page, pageSize, searchKey, sources, countries) => {
    const query = apiQueryBuilder(page, pageSize, searchKey, sources, countries);
    return axiosNews.get(`top-headlines?${query}`)
};

