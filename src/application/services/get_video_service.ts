import { Video } from "../../domain/entities/video";
import { GetVideo } from "../../domain/usecases/video/get_video";
import { VideoRepository } from "../../infrastructure/data/typeorm/repositories/video_repository";

export class GetVideoService implements GetVideo{
    constructor(private readonly videoRepository: VideoRepository) {}

    async get(id: number): Promise<Video | null> {
        return this.videoRepository.getById(id)
    }
    
}