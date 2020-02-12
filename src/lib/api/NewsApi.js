import {axiosNews} from '../axios/axiosInstances'

const token = '3bd6331ba9574e69916e6e9cf6caf086';

export const getSource = () => axiosNews.get(`sources?apiKey=${token}`);

export const getAllNews = (page, pageSize) => axiosNews.get(`everything?q=a&pageSize=${pageSize}&page=${page}&apiKey=${token}`);
