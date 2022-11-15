import { Video } from "../../entities";

export interface GetUserVideoInterface{
    email: string, page: number, rows: number, orderBy?: number
}

export interface GetUserVideos{
    get(infos: GetUserVideoInterface): Promise<Video[]>
}