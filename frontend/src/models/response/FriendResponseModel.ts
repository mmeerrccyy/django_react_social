import {PaginationInterface} from "./PostResponseModel";

export interface MinimalUserModel {
  id: string;
  username: string;
}

export interface FriendResponseModel {
  followers: MinimalUserModel[] | [];
  following: MinimalUserModel[] | [];
  friends: MinimalUserModel[] | [];
}

