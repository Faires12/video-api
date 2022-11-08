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

export interface VideoRepositoryInterface {
  create(video: CreateVideoInterface): Promise<Video>;
  getById(id: number): Promise<Video | null>;
  changeEvaluations(infos: ChangeEvaluationsInterface): Promise<void>;
}
