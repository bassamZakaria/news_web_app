import axios from "axios";

const baseURL = 'https://newsapi.org/v2/';

export const axiosNews = axios.create({
    baseURL: baseURL
});
