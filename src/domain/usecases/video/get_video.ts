import { Video } from "../../entities";

export interface VideoDTO extends Video{
    evaluation?: boolean | null
}

export interface GetVideo{
    get(id: number, userId: number | null): Promise<VideoDTO>
}