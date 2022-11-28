import { Video } from "../../../domain/entities";
import { VideoRepositoryInterface } from "../../../domain/repositories";
import { GetHomeVideos, GetHomeVideosInterface } from "../../../domain/usecases";
import { VideoOrderEnum } from "../../../utils/order_enums";

export class GetHomeVideosService implements GetHomeVideos{
    constructor(private readonly videoRepository: VideoRepositoryInterface){}

    async get(infos: GetHomeVideosInterface): Promise<Video[]> {
        return await this.videoRepository.getVideos({
            orderBy: VideoOrderEnum.Recent,
            page: infos.page,
            rows: infos.rows,
            excludeUserId: infos.userId ? infos.userId : undefined
        })
    }
}