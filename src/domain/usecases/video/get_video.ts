import { Video } from "../../entities/video";

export interface GetVideo{
    get(id: number): Promise<Video | null>
}