export interface AuthResponseModel {
	auth_token: string;
}

export interface RegisterResponse {
	username: string;
	email: string;
	id: number;
}

export interface MeResponse {
	email: string;
	username: string;
	id: string;
}