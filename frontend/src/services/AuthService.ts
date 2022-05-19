import $api from "../http";
import { AxiosResponse } from "axios";
import {AuthResponseModel, MeResponse, RegisterResponse} from "../models/response/AuthResponseModel";

export default class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseModel>> {
		return $api.post<AuthResponseModel>("/auth/jwt/create/", {email, password})
	}

	static async register(username: string, email: string, password: string, re_password: string): Promise<AxiosResponse<RegisterResponse>> {
		return $api.post<RegisterResponse>("/auth/users/", {username, email, password, re_password})
	}

	static async me(): Promise<AxiosResponse<MeResponse>> {
		return $api.get<MeResponse>("/auth/users/me/")
	}

	static async logout(): Promise<void> {
		return $api.post("/auth/token/logout/")
	}
}