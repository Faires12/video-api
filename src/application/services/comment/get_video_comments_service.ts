import { Comment } from "../../../domain/entities"
import { CommentRepositoryInterface, EvaluationRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories"
import { CommentDTO, GetVideoComments, GetVideoCommentsServiceInterface } from "../../../domain/usecases"
import { HttpException, HttpStatusCode } from "../../../utils/http";


export class GetVideoCommentsService implements GetVideoComments{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface,
        private readonly evaluationRepository: EvaluationRepositoryInterface){}

    async get(infos: GetVideoCommentsServiceInterface): Promise<CommentDTO[]> {
        if(!await this.videoRepository.getById(infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
        const comments =  await this.commentRepository.getByVideo(infos) as CommentDTO[]

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