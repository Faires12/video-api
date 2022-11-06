import { Video } from "../../entities";

export interface GetVideo{
    get(id: number): Promise<Video>
}