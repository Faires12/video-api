import { GetEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetCommentEvaluationController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeGetCommentEvaluationValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['commentId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('commentId', 1))
    return new ValidationComposite(validations)
}

export const makeGetCommentEvaluationController = () : GetCommentEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const getEvaluationService = new GetEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new GetCommentEvaluationController(makeGetCommentEvaluationValidation(), getEvaluationService)
}