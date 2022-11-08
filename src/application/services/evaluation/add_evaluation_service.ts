import { Evaluation } from "../../../domain/entities";
import {
  CommentRepositoryInterface,
  EvaluationRepositoryInterface,
  VideoRepositoryInterface,
} from "../../../domain/repositories";
import {
  AddEvaluation,
  AddEvaluationInterface,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class AddEvaluationService implements AddEvaluation {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryInterface,
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly commentRepository: CommentRepositoryInterface
  ) {}

  async create(evaluation: AddEvaluationInterface): Promise<Evaluation> {
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

    if (!existingEvaluation) {
      evaluation.isVideo
        ? await this.videoRepository.changeEvaluations({
            id: evaluation.reference_id,
            isLike: evaluation.isLike,
            isPositive: true,
          })
        : await this.commentRepository.changeEvaluations({
            id: evaluation.reference_id,
            isLike: evaluation.isLike,
            isPositive: true,
          });

      return await this.evaluationRepository.create({
        created_by: evaluation.created_by,
        isPositive: evaluation.isLike,
        videoId: evaluation.isVideo ? evaluation.reference_id : undefined,
        commentId: !evaluation.isVideo ? evaluation.reference_id : undefined,
      });
    } else {
      if (existingEvaluation.isPositive === evaluation.isLike) {
        evaluation.isVideo
          ? await this.videoRepository.changeEvaluations({
              id: evaluation.reference_id,
              isLike: evaluation.isLike,
              isPositive: true,
            })
          : await this.commentRepository.changeEvaluations({
              id: evaluation.reference_id,
              isLike: evaluation.isLike,
              isPositive: true,
            });
        return await this.evaluationRepository.delete(existingEvaluation.id);
      } else {
        if (evaluation.isVideo) {
          await this.videoRepository.changeEvaluations({
            id: evaluation.reference_id,
            isLike: evaluation.isLike,
            isPositive: true,
            isChange: true,
          });
        } else {
          await this.commentRepository.changeEvaluations({
            id: evaluation.reference_id,
            isLike: evaluation.isLike,
            isPositive: true,
            isChange: true,
          });
        }
        return await this.evaluationRepository.update({
          id: existingEvaluation.id,
          isPositive: evaluation.isLike,
        });
      }
    }
  }
}
