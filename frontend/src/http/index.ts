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

export default $api;