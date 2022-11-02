import { Evaluation } from "../../domain/entities/Evaluation";
import { EvaluationRepositoryInterface } from "../../domain/repositories/evaluation_repository";
import {
  AddEvaluation,
  AddEvaluationInterface,
} from "../../domain/usecases/evaluation/create_evaluation";
import { CommentRepository } from "../../infrastructure/data/typeorm/repositories/comment_repository";
import { VideoRepository } from "../../infrastructure/data/typeorm/repositories/video_repository";

export class AddEvaluationService implements AddEvaluation {
  constructor(
    private readonly evaluationRepository: EvaluationRepositoryInterface,
    private readonly videoRepository: VideoRepository,
    private readonly commentRepository: CommentRepository
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
      evaluation.isVideo ? 
        await this.videoRepository.changeEvaluations(evaluation.reference_id, evaluation.isPositive, true) : 
        await this.commentRepository.changeEvaluations(evaluation.reference_id, evaluation.isPositive, true)

      return await this.evaluationRepository.create({
        created_by: evaluation.created_by,
        isPositive: evaluation.isPositive,
        videoId: evaluation.isVideo ? evaluation.reference_id : undefined,
        commentId: !evaluation.isVideo ? evaluation.reference_id : undefined,
      });
    }
      
    else {
        if(existingEvaluation.isPositive === evaluation.isPositive){
          evaluation.isVideo ? 
        await this.videoRepository.changeEvaluations(evaluation.reference_id, evaluation.isPositive, false) : 
        await this.commentRepository.changeEvaluations(evaluation.reference_id, evaluation.isPositive, false)
          return await this.evaluationRepository.delete(existingEvaluation.id)
        }        
        else {
          if(evaluation.isVideo){
            await this.videoRepository.changeEvaluations(evaluation.reference_id, evaluation.isPositive, true)
            await this.videoRepository.changeEvaluations(evaluation.reference_id, !evaluation.isPositive, false)
          } else {
            await this.commentRepository.changeEvaluations(evaluation.reference_id, evaluation.isPositive, true)
            await this.commentRepository.changeEvaluations(evaluation.reference_id, !evaluation.isPositive, false)
          }
          return await this.evaluationRepository.update({id: existingEvaluation.id, isPositive: evaluation.isPositive})
        }          
    }
  }
}
