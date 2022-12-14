import { Comment } from "../entities";
import { ChangeEvaluationsInterface } from "./video_repository";

export interface CreateCommentInterface {
  created_by: number;
  content: string;
  video_id?: number;
  comment_id?: number;
}

export interface GetVideoCommentsInterface {
  videoId: number;
  page: number;
  rows: number;
}


export interface GetCommentResponsesInterface {
  commentId: number;
  page: number;
  rows: number;
}

export interface ChangeResponseCountInterface {
  id: number;
  isPositive: boolean;
}

export interface EditCommentRepositoryInterface {
  content: string;
  id: number
}

export interface CommentRepositoryInterface {
  create(comment: CreateCommentInterface): Promise<Comment>;
  getById(id: number): Promise<Comment | null>;
  changeEvaluations(infos: ChangeEvaluationsInterface): Promise<void>;
  getByVideo(infos: GetVideoCommentsInterface): Promise<Comment[]>;
  getByComment(infos: GetCommentResponsesInterface): Promise<Comment[]>;
  changeCommentCount(infos: ChangeResponseCountInterface): Promise<void>;
  delete(id: number) : Promise<void>
  edit(infos: EditCommentRepositoryInterface) : Promise<Comment>
}
