import { Video } from "../entities";

export interface CreateVideoInterface {
  title: string;
  description?: string;
  path: string;
  thumbnail: string;
  created_by: number;
  duration: number
}

export interface ChangeEvaluationsInterface {
  id: number;
  isLike: boolean;
  isPositive: boolean;
  isChange?: boolean;
}

export interface ChangeCommentCountInterface {
  id: number;
  isPositive: boolean;
}

export interface GetUserVideoRepositoryInterface {
  userId: number;
  page: number;
  rows: number;
  orderBy: number;
}

export interface GetVideoRepositoryInterface {
  orderBy: number;
  excludeUserId?: number;
  excludeVideoId?: number;
  page: number;
  rows: number;
}

export interface EditVideoRepositoryInterface {
  title?: string;
  description?: string;
  thumbnail?: string;
  id: number;
}

export interface SearchVideosRepositoryInterface {
  search: string;
  page: number;
  rows: number;
  userId?: number;
  orderBy?: number;
  includeUserVideos?: boolean
}

export interface VideoRepositoryInterface {
  create(video: CreateVideoInterface): Promise<Video>;
  getById(id: number): Promise<Video | null>;
  changeEvaluations(infos: ChangeEvaluationsInterface): Promise<void>;
  changeCommentCount(infos: ChangeCommentCountInterface): Promise<void>;
  getByUser(infos: GetUserVideoRepositoryInterface): Promise<Video[]>;
  getAllUserVideos(userId: number): Promise<Video[]>;
  getVideos(infos: GetVideoRepositoryInterface): Promise<Video[]>;
  delete(id: number): Promise<void>;
  edit(infos: EditVideoRepositoryInterface): Promise<Video>;
  search(infos: SearchVideosRepositoryInterface): Promise<Video[]>
  addView(videoId: number): Promise<void>
}
