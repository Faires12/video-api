import { Comment } from "../../../domain/entities";
import {
  CommentRepositoryInterface,
  EvaluationRepositoryInterface,
} from "../../../domain/repositories";
import {
  CommentDTO,
  GetCommentResponses,
  GetCommentResponsesInterface,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class GetCommentResponsesService implements GetCommentResponses {
  constructor(
    private readonly commentRepository: CommentRepositoryInterface,
    private readonly evaluationRepository: EvaluationRepositoryInterface
  ) {}
  async get(infos: GetCommentResponsesInterface): Promise<CommentDTO[]> {
    const existingComment = await this.commentRepository.getById(
      infos.commentId
    ) 
    if (existingComment === null)
      throw new HttpException(HttpStatusCode.NotFound, "Comment not found");
    if (!existingComment.responses)
      throw new HttpException(
        HttpStatusCode.BadRequest,
        "Only main comment can be responded"
      );

    const comments = await this.commentRepository.getByComment({
      commentId: infos.commentId,
      page: infos.page,
      rows: infos.rows,
    }) as CommentDTO[]

    if (!infos.userId) return comments;

    for (const comment of comments) {
      if (!comment.id) continue;
      const evaluation = await this.evaluationRepository.getByComment(
        comment.id,
        infos.userId
      );
      comment.evaluation = evaluation ? evaluation.isPositive : null;
    }

    return comments;
  }
}
