import { Video } from "../entities/video"

export interface VideoRepositoryInterface{
    create(video: Video) : Promise<Video>
    update(video: Video) : Promise<Video>
    getAll() : Promise<Video[]>
    getById(id: number) : Promise<Video | null>
    delete(id: number) : Promise<Video>
}