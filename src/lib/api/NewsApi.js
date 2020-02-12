import {axiosNews} from '../axios/axiosInstances'

export const getSource = () => axiosNews.get(`sources?apiKey=3bd6331ba9574e69916e6e9cf6caf086`);