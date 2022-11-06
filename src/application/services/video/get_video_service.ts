import { Video } from "../../../domain/entities";
import { VideoRepositoryInterface } from "../../../domain/repositories";
import { GetVideo } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";


export class GetVideoService implements GetVideo{
    constructor(private readonly videoRepository: VideoRepositoryInterface) {}

    async get(id: number): Promise<Video> {
        const video = await this.videoRepository.getById(id)
        if(!video)
            throw new HttpException(HttpStatusCode.NotFound, "Video not found")      
        else
            return video
    }
    
}