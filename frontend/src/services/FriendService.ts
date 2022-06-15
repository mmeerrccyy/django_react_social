import {AxiosResponse} from "axios";
import $api from "../http";
import {FriendResponseModel} from "../models/response/FriendResponseModel";


export default class FriendService {
  static fetchFriends(): Promise<AxiosResponse<FriendResponseModel>> {
    return $api.get<FriendResponseModel>("/friends/me")
  }
}
