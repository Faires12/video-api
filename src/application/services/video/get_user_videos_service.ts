import { Video } from "../../../domain/entities";
import { UserRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { GetUserVideoInterface, GetUserVideos } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { VideoOrderEnum } from "../../../utils/order_enums";

export class GetUserVideosService implements GetUserVideos{
    constructor(private readonly videoRepository: VideoRepositoryInterface,
        private readonly userRepository: UserRepositoryInterface){}

    async get(infos: GetUserVideoInterface): Promise<Video[]> {
        const user = await this.userRepository.getByEmail(infos.email)
        if(!user || !user.id)
            throw new HttpException(HttpStatusCode.NotFound, "User not found")
        
        if(infos.orderBy && !(infos.orderBy in VideoOrderEnum))
            throw new HttpException(HttpStatusCode.NotFound, "Invalid order type")
        else if(!infos.orderBy)
            infos.orderBy = 1
        
        const videos = await this.videoRepository.getByUser({
            userId: user.id,
            page: infos.page,
            rows: infos.rows,
            orderBy: infos.orderBy
        })
        return videos
    }
}