import axios from 'axios';
import queryString from 'query-string';
const BASE_URL_LOCAL = 'http://localhost:8000/api';
const PRODUCT_URL = 'https://api-mcs-manager.herokuapp.com/api';
const callApi = axios.create({
	baseURL: BASE_URL_LOCAL,
	headers: {
		'Content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

callApi.interceptors.response.use(
	function (response) {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	function (error) {
		return Promise.reject(error.response);
	},
);

export default callApi;
