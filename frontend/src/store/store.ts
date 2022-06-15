import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {MeResponse} from "../models/response/AuthResponseModel";
import PostService from "../services/PostService";
import {PaginatedPostResponseModel, PostResponseModel} from "../models/response/PostResponseModel";
import {FriendResponseModel, MinimalUserModel} from "../models/response/FriendResponseModel";
import FriendService from "../services/FriendService";

export default class Store {
  user = {} as MeResponse;
  isAuth = false;
  posts = {} as PaginatedPostResponseModel;
  friends = {} as FriendResponseModel;
  new_post_text = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: MeResponse) {
    this.user = user;
  }

  setPosts(posts: PaginatedPostResponseModel) {
    this.posts = posts;
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
      await this.login(email, password);
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

  async getMyPosts() {
    try {
      const my_posts = await PostService.fetchMyPosts()
      this.setPosts(my_posts.data)
    } catch (e) {
      console.log(e)
    }
  }

  async likePost(post_id: string) {
    try {
      await PostService.likePost(post_id).then((response) => {
        const new_post = response.data;
        const post_index = this.posts.results.findIndex((post_el) => post_el.id == new_post.id)
        if (post_index != undefined) {
          const new_posts = this.posts
          new_posts.results[post_index] = new_post;
          this.setPosts(new_posts);
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async deletePost(post_id: string) {
    try {
      await PostService.deletePost(post_id).then((response) => {
        if (response.status === 200) {
          const deleted_post_index = this.posts.results.findIndex((post_el) => post_el.id === post_id)
          if (deleted_post_index != undefined) {
            this.posts.results.splice(deleted_post_index, 1)
            this.setPosts({...this.posts, count: this.posts.count - 1})
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async changeNewPostText(value: string) {
    this.new_post_text = value;
  }

  async createPost() {
    try {
      await PostService.createPost(this.new_post_text).then((response) => {
        if (response.status === 201 && response.data) {
          this.changeNewPostText("");
          // @ts-ignore
          this.posts.results.unshift(response.data)
          this.setPosts({...this.posts, count: this.posts.count + 1})
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async setFriends(array: MinimalUserModel[] | []) {
    this.friends.friends = array
  }

  async setFollowers(array: MinimalUserModel[] | []) {
    this.friends.followers = array
  }

  async setFollowing(array: MinimalUserModel[] | []) {
    this.friends.following = array
  }

  async getMyFriends() {
    try {
      const friend_response = await FriendService.fetchFriends()
      await this.setFriends(friend_response.data.friends)
      await this.setFollowers(friend_response.data.followers)
      await this.setFollowing(friend_response.data.following)
    } catch (e) {
      console.log(e)
    }
  }

}