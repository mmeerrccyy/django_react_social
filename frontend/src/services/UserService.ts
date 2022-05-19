import {AxiosResponse} from "axios";
import $api from "../http";
import {MeResponse} from "../models/response/AuthResponseModel";

export default class UserService {
	static fetchUsers(): Promise<AxiosResponse<MeResponse[]>> {
		return $api.get<MeResponse[]>("/auth/users/")
	}
}