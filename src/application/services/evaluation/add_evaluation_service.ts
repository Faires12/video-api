import { Evaluation } from "../../../domain/entities";
import { CommentRepositoryInterface, EvaluationRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { AddEvaluation, AddEvaluationInterface } from "../../../domain/usecases";


export class AddEvaluationService implements AddEvaluation {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryInterface,
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly commentRepository: CommentRepositoryInterface
  ) {}

  async create(evaluation: AddEvaluationInterface): Promise<Evaluation | null> {
    if (
      evaluation.isVideo &&
      !(await this.videoRepository.getById(evaluation.reference_id))
    )
      return null;
    else if (
      !evaluation.isVideo &&
      !(await this.commentRepository.getById(evaluation.reference_id))
    )
      return null;

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
        ? await this.videoRepository.changeEvaluations(
            evaluation.reference_id,
            evaluation.isPositive,
            true
          )
        : await this.commentRepository.changeEvaluations(
            evaluation.reference_id,
            evaluation.isPositive,
            true
          );

      return await this.evaluationRepository.create({
        created_by: evaluation.created_by,
        isPositive: evaluation.isPositive,
        videoId: evaluation.isVideo ? evaluation.reference_id : undefined,
        commentId: !evaluation.isVideo ? evaluation.reference_id : undefined,
      });
    } else {
      if (existingEvaluation.isPositive === evaluation.isPositive) {
        evaluation.isVideo
          ? await this.videoRepository.changeEvaluations(
              evaluation.reference_id,
              evaluation.isPositive,
              false
            )
          : await this.commentRepository.changeEvaluations(
              evaluation.reference_id,
              evaluation.isPositive,
              false
            );
        return await this.evaluationRepository.delete(existingEvaluation.id);
      } else {
        if (evaluation.isVideo) {
          await this.videoRepository.changeEvaluations(
            evaluation.reference_id,
            evaluation.isPositive,
            true,
            true
          );
        } else {
          await this.commentRepository.changeEvaluations(
            evaluation.reference_id,
            evaluation.isPositive,
            true,
            true
          );
        }
        return await this.evaluationRepository.update({
          id: existingEvaluation.id,
          isPositive: evaluation.isPositive,
        });
      }
    }
  }
}
