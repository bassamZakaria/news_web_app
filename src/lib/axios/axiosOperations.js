import axios from 'axios';

export const cancel = (CancelTokenSource) => {
	CancelTokenSource.cancel('Operation canceled due to new request.')
};

export const generateCancelTokenSource = () => {
	return axios.CancelToken.source();
};
