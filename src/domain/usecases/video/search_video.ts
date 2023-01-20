import { Video } from "../../entities"

export interface SearchVideosInterface{
    search: string, page: number, rows: number, userId?: number, orderBy?: number, includeUserVideos?: boolean
}

export interface SearchVideos{
    search(infos: SearchVideosInterface): Promise<Video[]>
}