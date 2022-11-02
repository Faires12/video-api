import { Video } from "../entities/video"

export interface CreateVideoInterface{
    title: string,
    description?: string,
    path: string,
    thumbnail: string,
    created_by: number,
}

export interface VideoRepositoryInterface{
    create(video: CreateVideoInterface) : Promise<Video>
    update(video: Video) : Promise<Video>
    getAll() : Promise<Video[]>
    getById(id: number) : Promise<Video | null>
    delete(id: number) : Promise<Video>
    changeEvaluations(id: number, isLike: boolean, isPositive: boolean) : Promise<void>
}