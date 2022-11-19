import { Video } from "../../entities";

export interface GetRelatedVideosInterface{
    otherUserEmail: string, page: number, rows: number
}

export interface GetRelatedVideos{
    get(infos: GetRelatedVideosInterface): Promise<Video[]>
}