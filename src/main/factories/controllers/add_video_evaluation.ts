import { AddEvaluationService } from "../../../application/services/add_evaluation_service"
import { CommentRepository } from "../../../infrastructure/data/typeorm/repositories/comment_repository"
import { EvaluationRepository } from "../../../infrastructure/data/typeorm/repositories/evaluation_repository"
import { VideoRepository } from "../../../infrastructure/data/typeorm/repositories/video_repository"
import { AddVideoEvaluationController } from "../../../presentation/controllers/evaluation/add_video_evaluation_controller"
import makeAddVideoEvaluationValidation from "../validations/add_video_evaluation"

export const makeAddVideoEvaluationController = () : AddVideoEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const addEvaluationService = new AddEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new AddVideoEvaluationController(makeAddVideoEvaluationValidation(), addEvaluationService)
}