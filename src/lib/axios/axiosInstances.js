import axios from "axios";

export const axiosNews =axios.create({
    baseURL: 'https://newsapi.org/v2/'
});
