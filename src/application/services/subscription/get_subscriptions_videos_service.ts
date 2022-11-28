import { SubscriptionRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import {  GetSubscriptionsVideos, GetSubscriptionsVideosDto, GetSubscriptionsVideosInterface } from "../../../domain/usecases";
import { VideoOrderEnum } from "../../../utils/order_enums";

export class GetSubscriptionsVideosService implements GetSubscriptionsVideos{
    constructor(private readonly subscriptionRepository: SubscriptionRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface) {}
    
    async get(infos: GetSubscriptionsVideosInterface): Promise<GetSubscriptionsVideosDto> {
        const subs = await this.subscriptionRepository.getUserSubscriptions(infos.userId)
        let res : GetSubscriptionsVideosDto = {
            recent: [],
            popular: []
        }

        for(const sub of subs){
            const recent = await this.videoRepository.getByUser({
                userId: sub.subscriptedTo,
                page: infos.page,
                rows: infos.rows,
                orderBy: VideoOrderEnum.Recent
            })
            const popular = await this.videoRepository.getByUser({
                userId: sub.subscriptedTo,
                page: infos.page,
                rows: infos.rows,
                orderBy: VideoOrderEnum.Views
            })
            res.recent.push(...recent)
            res.popular.push(...popular)
        }

        return res
    }
}