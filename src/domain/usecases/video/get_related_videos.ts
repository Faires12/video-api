import { Video } from "../../entities";

export interface GetRelatedVideosInterface{
    videoId: number, page: number, rows: number
}

export interface GetRelatedVideos{
    get(infos: GetRelatedVideosInterface): Promise<Video[]>
}