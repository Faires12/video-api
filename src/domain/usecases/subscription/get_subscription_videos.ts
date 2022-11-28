import { Video } from "../../entities"

export interface GetSubscriptionsVideosInterface{
    userId: number
    page: number
    rows: number
}

export interface GetSubscriptionsVideosDto{
    recent: Video[]
    popular: Video[]
}

export interface GetSubscriptionsVideos{
    get(infos: GetSubscriptionsVideosInterface): Promise<GetSubscriptionsVideosDto>
}