import { Comment } from "../../../domain/entities";
import { CommentRepositoryInterface, EvaluationRepositoryInterface } from "../../../domain/repositories";
import { GetComment } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class GetCommentService implements GetComment{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly evaluationRepository: EvaluationRepositoryInterface) {}

    async get(id: number, userId: number | null): Promise<Comment> {
        const comment = await this.commentRepository.getById(id)
        if(!comment)
            throw new HttpException(HttpStatusCode.NotFound, "Comment not found")
        
        if(!userId)
            return comment

        const evaluation = await this.evaluationRepository.getByComment(id, userId)
        comment.evaluation = evaluation ? evaluation.isPositive : null

        return comment
    }
    
}