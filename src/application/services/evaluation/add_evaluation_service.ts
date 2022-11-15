import { Comment, Video } from "../../../domain/entities";
import {
  CommentRepositoryInterface,
  EvaluationRepositoryInterface,
  VideoRepositoryInterface,
} from "../../../domain/repositories";
import {
  AddEvaluation,
  AddEvaluationInterface,
  CommentDTO,
  VideoDTO,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class AddEvaluationService implements AddEvaluation {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryInterface,
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly commentRepository: CommentRepositoryInterface
  ) {}

  async create(
    evaluation: AddEvaluationInterface
  ): Promise<VideoDTO | CommentDTO | null> {
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

      await this.evaluationRepository.create({
        created_by: evaluation.created_by,
        isPositive: evaluation.isLike,
        videoId: evaluation.isVideo ? evaluation.reference_id : undefined,
        commentId: !evaluation.isVideo ? evaluation.reference_id : undefined,
      });

      if (evaluation.isVideo) {
        const video = await this.videoRepository.getById(
          evaluation.reference_id
        ) as VideoDTO
        if (video) video.evaluation = evaluation.isLike;
        return video;
      } else {
        const comment = await this.commentRepository.getById(
          evaluation.reference_id
        ) as CommentDTO
        if (comment) comment.evaluation = evaluation.isLike;
        return comment;
      }
    } else if (existingEvaluation.id) {
      if (existingEvaluation.isPositive === evaluation.isLike) {
        evaluation.isVideo
          ? await this.videoRepository.changeEvaluations({
              id: evaluation.reference_id,
              isLike: evaluation.isLike,
              isPositive: false,
            })
          : await this.commentRepository.changeEvaluations({
              id: evaluation.reference_id,
              isLike: evaluation.isLike,
              isPositive: false,
            });
        await this.evaluationRepository.delete(existingEvaluation.id);

        if (evaluation.isVideo) {
          const video = await this.videoRepository.getById(
            evaluation.reference_id
          ) as VideoDTO
          if (video) video.evaluation = null;
          return video;
        } else {
          const comment = await this.commentRepository.getById(
            evaluation.reference_id
          ) as CommentDTO
          if (comment) comment.evaluation = null;
          return comment;
        }
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
        await this.evaluationRepository.update({
          id: existingEvaluation.id,
          isPositive: evaluation.isLike,
        });

        if (evaluation.isVideo) {
          const video = await this.videoRepository.getById(
            evaluation.reference_id
          ) as VideoDTO
          if (video) video.evaluation = evaluation.isLike;
          return video;
        } else {
          const comment = await this.commentRepository.getById(
            evaluation.reference_id
          ) as CommentDTO
          if (comment) comment.evaluation = evaluation.isLike;
          return comment;
        }
      }
    }
    return null;
  }
}
