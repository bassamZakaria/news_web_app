import axios from "axios";

const baseURL = process.env.REACT_APP_NEWS_API_URL;

export const axiosNews = axios.create({
    baseURL: baseURL
});
