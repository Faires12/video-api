import { AddEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddCommentEvaluationController } from "../../../../presentation/controllers"
import { BooleanValidation, NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeAddCommentvaluationValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['isPositive', 'commentId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('commentId', 1))
    validations.push(new BooleanValidation('isPositive'))
    return new ValidationComposite(validations)
}

export const makeAddCommentEvaluationController = () : AddCommentEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const addEvaluationService = new AddEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new AddCommentEvaluationController(makeAddCommentvaluationValidation(), addEvaluationService)
}