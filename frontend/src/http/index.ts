import axios from "axios";
export const API_URL = `http://localhost:8000/api`

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		// @ts-ignore
		config.headers.Authorization = `Token ${token}`
	}
	return config;
})

$api.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	if (error.response.status === 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			localStorage.removeItem("token");
			return $api.request(originalRequest);
		} catch (e) {
			console.log(e);
		}
	}
})

export default $api;