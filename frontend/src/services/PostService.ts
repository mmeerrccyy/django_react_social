import {AxiosResponse} from "axios";
import $api from "../http"
import {PaginatedPostResponseModel, PostResponseModel} from "../models/response/PostResponseModel";

export default class PostService {
  static fetchMyPosts(): Promise<AxiosResponse<PaginatedPostResponseModel>> {
    return $api.get<PaginatedPostResponseModel>("/posts/me")
  }

  static likePost(post_id: string): Promise<AxiosResponse<PostResponseModel>> {
    return $api.get<PostResponseModel>(`/posts/${post_id}/like`)
  }

  static deletePost(post_id: string): Promise<AxiosResponse> {
    return $api.delete(`/posts/${post_id}/delete`)
  }

  static createPost(post_data: string): Promise<AxiosResponse<PostResponseModel>> {
    return $api.post("/posts/create/", {text: post_data})
  }
}
