import { Video } from "../../entities";

export interface GetVideo{
    get(id: number, userId: number | null): Promise<Video>
}