import axios from 'axios';
import {notification} from "antd";

//region Cancel
export const cancel = (CancelTokenSource) => {
    CancelTokenSource.cancel('Operation canceled due to new request.')
};

export const generateCancelTokenSource = () => {
    return axios.CancelToken.source();
};
//endregion

//region Interceptors
export const responseInterceptor = error => {
    // We don't need to handle the canceled requests
    if (axios.isCancel(error)) {
        return;
    }
    if (error.response) {
        if (error.response.data && error.response.data.message) {
            notification.error({
                message: 'Error',
                description: error.response.data.message
            });
        } else if (error.message) {
            notification.error({
                message: 'Error',
                description: error.message
            });
        } else {
            notification.error({
                message: 'Error',
            });
        }
    } else if (error.message) {
        notification.error({
            message: 'Error',
            description: error.message
        })
    } else {
        notification.error({
            message: 'Error',
        });
    }
};
//endregion
