import { Comment } from "../../../domain/entities"
import { CommentRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories"
import { GetVideoComments, GetVideoCommentsServiceInterface } from "../../../domain/usecases"
import { EvaluationRepository } from "../../../infrastructure/data/typeorm/repositories";
import { HttpException, HttpStatusCode } from "../../../utils/http";


export class GetVideoCommentsService implements GetVideoComments{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface,
        private readonly evaluationRepository: EvaluationRepository){}

    async get(infos: GetVideoCommentsServiceInterface): Promise<Comment[]> {
        if(!await this.videoRepository.getById(infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
        const comments =  await this.commentRepository.getByVideo(infos)

        if(!infos.userId)
            return comments
        
        for(const comment of comments){
            if(!comment.id)
                continue
            const evaluation = await this.evaluationRepository.getByComment(comment.id, infos.userId)
            comment.evaluation = evaluation ? evaluation.isPositive : null
        }

        return comments
    }
  
}