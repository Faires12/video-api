import { Video } from "../../../domain/entities";
import { VideoRepositoryInterface } from "../../../domain/repositories";
import { GetVideo } from "../../../domain/usecases";


export class GetVideoService implements GetVideo{
    constructor(private readonly videoRepository: VideoRepositoryInterface) {}

    async get(id: number): Promise<Video | null> {
        return this.videoRepository.getById(id)
    }
    
}