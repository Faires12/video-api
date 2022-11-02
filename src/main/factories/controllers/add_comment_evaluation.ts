import { AddEvaluationService } from "../../../application/services/add_evaluation_service"
import { CommentRepository } from "../../../infrastructure/data/typeorm/repositories/comment_repository"
import { EvaluationRepository } from "../../../infrastructure/data/typeorm/repositories/evaluation_repository"
import { VideoRepository } from "../../../infrastructure/data/typeorm/repositories/video_repository"
import { AddCommentEvaluationController } from "../../../presentation/controllers/evaluation/add_comment_evaluation_controller"
import makeAddCommentvaluationValidation from "../validations/add_comment_evaluation"

export const makeAddCommentEvaluationController = () : AddCommentEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const addEvaluationService = new AddEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new AddCommentEvaluationController(makeAddCommentvaluationValidation(), addEvaluationService)
}