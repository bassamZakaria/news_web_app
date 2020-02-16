import {axiosNews} from "./axiosInstances";
import {responseInterceptor} from "./axiosHelper";

export default () => {

    axiosNews.interceptors.response.use(res => res, error => {
        return responseInterceptor(error);
    });
}
