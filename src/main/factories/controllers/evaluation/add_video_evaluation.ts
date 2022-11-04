import { AddEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddVideoEvaluationController } from "../../../../presentation/controllers"
import { makeAddVideoEvaluationValidation } from "../../validations"


export const makeAddVideoEvaluationController = () : AddVideoEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const addEvaluationService = new AddEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new AddVideoEvaluationController(makeAddVideoEvaluationValidation(), addEvaluationService)
}