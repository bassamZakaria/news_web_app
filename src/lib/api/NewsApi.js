import {axiosNews} from '../axios/axiosInstances'


export const apiQueryBuilder = (page, pageSize, searchKey, sources, countries) => {
    const token = '3bd6331ba9574e69916e6e9cf6caf086';
    let query = `apiKey=${token}`;
    if (page) {
        query = query.concat(`&page=${page}`)
    }
    if (pageSize) {
        query = query.concat(`&pageSize=${pageSize}`)
    }
    if (searchKey) {
        query = query.concat(`&q=${searchKey}`)
    }
    if (sources && sources.length) {
        query = query.concat(`&sources=${sources}`)
    }
    if (countries && countries.length) {
        query = query.concat(`&sources=${countries}`)
    }
    return query;
};

export const getSource = () => axiosNews.get(`sources?${apiQueryBuilder()}`);

export const getAllNews = (page, pageSize, searchKey, sources) => {
    const query = apiQueryBuilder(page, pageSize, searchKey, sources);
    return axiosNews.get(`everything?${query}`)
};

export const getHeadlines = (page, pageSize, searchKey, sources, countries) => {
    const query = apiQueryBuilder(page, pageSize, searchKey, sources, countries);
    return axiosNews.get(`top-headlines?${query}`)
};

