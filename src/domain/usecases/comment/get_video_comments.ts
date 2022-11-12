import { Comment } from "../../entities";

export interface GetVideoCommentsServiceInterface {
  videoId: number;
  page: number;
  rows: number;
  userId: number | null;
}

export interface GetVideoComments {
  get(infos: GetVideoCommentsServiceInterface): Promise<Comment[]>;
}
