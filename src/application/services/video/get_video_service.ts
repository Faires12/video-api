import { Video } from "../../../domain/entities";
import { EvaluationRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { GetVideo } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";


export class GetVideoService implements GetVideo{
    constructor(private readonly videoRepository: VideoRepositoryInterface,
        private readonly evaluationRepository: EvaluationRepositoryInterface) {}

    async get(id: number, userId: number | null): Promise<Video> {
        const video = await this.videoRepository.getById(id)
        if(!video)
            throw new HttpException(HttpStatusCode.NotFound, "Video not found")      
        
        if(!userId)
            return video
        
        const evaluation = await this.evaluationRepository.getByVideo(id, userId)
        video.evaluation = evaluation ? evaluation.isPositive : null

        return video
    }
    
}