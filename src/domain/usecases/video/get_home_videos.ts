import { Video } from "../../entities";

export interface GetHomeVideosInterface{
    page: number, rows: number, userId?: number
}

export interface GetHomeVideos{
    get(infos: GetHomeVideosInterface): Promise<Video[]>
}