export interface PaginationInterface {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PaginatedPostResponseModel extends PaginationInterface{
  results: PostResponseModel[] | [];
}

export interface PostResponseModel {
  id: string;
  created_at: string;
  updated_at: string;
  text: string;
  author_id: string;
  liked: String[] | []
}
