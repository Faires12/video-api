import { Video } from "../entities";

export interface CreateVideoInterface {
  title: string;
  description?: string;
  path: string;
  thumbnail: string;
  created_by: number;
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

export interface GetUserVideoRepositoryInterface{
  userId: number, page: number, rows: number, orderBy: number
}

export interface GetRandomVideoRepositoryInterface{
  userId?: number
  amount: number
  onlyUser?: boolean
}

export interface VideoRepositoryInterface {
  create(video: CreateVideoInterface): Promise<Video>;
  getById(id: number): Promise<Video | null>;
  changeEvaluations(infos: ChangeEvaluationsInterface): Promise<void>;
  changeCommentCount(infos: ChangeCommentCountInterface): Promise<void>;
  getByUser(infos: GetUserVideoRepositoryInterface) : Promise<Video[]>
  getRandomVideos(infos: GetRandomVideoRepositoryInterface) : Promise<Video[]>
}
