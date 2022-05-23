import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {MeResponse} from "../models/response/AuthResponseModel";

export default class Store {
	user = {} as MeResponse;
	isAuth = false;

	constructor() {
		makeAutoObservable(this);
	}

	setAuth(bool: boolean) {
		this.isAuth = bool;
	}

	setUser(user: MeResponse) {
		this.user = user;
	}

	async login(email: string, password: string) {
		try {
			const token_response = await AuthService.login(email, password);
			localStorage.setItem("token", token_response.data.auth_token);
			const me_response = await AuthService.me();
			this.setAuth(true)
			this.setUser(me_response.data)
		} catch (e) {
			console.log(e)
		}
	}

	async register(email: string, username: string, password: string, re_password: string) {
		try {
			await AuthService.register(username, email, password, re_password)
			this.login(email, password);
		} catch (e) {
			console.log(e)
		}
	}

	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem("token");
			this.setUser({} as MeResponse);
			this.setAuth(false);
		} catch (e) {
			console.log(e)
		}
	}

	async checkAuth() {
		try {
			const me_response = await AuthService.me();
			this.setAuth(true)
			this.setUser(me_response.data)
		} catch (e) {
			console.log(e)
		}
	}

}