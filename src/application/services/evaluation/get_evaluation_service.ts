import {
  CommentRepositoryInterface,
  EvaluationRepositoryInterface,
  VideoRepositoryInterface,
} from "../../../domain/repositories";
import {
  GetEvaluation,
  GetEvaluationInterface,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class GetEvaluationService implements GetEvaluation {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryInterface,
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly commentRepository: CommentRepositoryInterface
  ) {}

  async get(evaluation: GetEvaluationInterface): Promise<boolean | null> {
    if (
      evaluation.isVideo &&
      !(await this.videoRepository.getById(evaluation.reference_id))
    )
      throw new HttpException(HttpStatusCode.NotFound, "Video not found");
    else if (
      !evaluation.isVideo &&
      !(await this.commentRepository.getById(evaluation.reference_id))
    )
      throw new HttpException(HttpStatusCode.NotFound, "Comment not found");

    const existingEvaluation = evaluation.isVideo
      ? await this.evaluationRepository.getByVideo(
          evaluation.reference_id,
          evaluation.created_by
        )
      : await this.evaluationRepository.getByComment(
          evaluation.reference_id,
          evaluation.created_by
        );
    
    if(!existingEvaluation)
        return null
    return existingEvaluation.isPositive
  }
}
