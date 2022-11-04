import { AddEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddCommentEvaluationController } from "../../../../presentation/controllers"
import { makeAddCommentvaluationValidation } from "../../validations"

export const makeAddCommentEvaluationController = () : AddCommentEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const addEvaluationService = new AddEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new AddCommentEvaluationController(makeAddCommentvaluationValidation(), addEvaluationService)
}