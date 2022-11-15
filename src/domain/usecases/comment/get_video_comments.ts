import { Comment } from "../../entities";

export interface GetVideoCommentsServiceInterface {
  videoId: number;
  page: number;
  rows: number;
  userId: number | null;
}

export interface CommentDTO extends Comment{
  evaluation?: boolean | null
}

export interface GetVideoComments {
  get(infos: GetVideoCommentsServiceInterface): Promise<CommentDTO[]>;
}
