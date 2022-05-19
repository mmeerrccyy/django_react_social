export interface AuthResponseModel {
	access: string;
	refresh: string;
}

export interface RegisterResponse {
	username: string;
	email: string;
	id: number;
}

export interface MeResponse {
	email: string;
	username: string;
	id: number;
}