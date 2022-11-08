import { AddEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddVideoEvaluationController } from "../../../../presentation/controllers"
import { BooleanValidation, NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeAddVideoEvaluationValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['isPositive', 'videoId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    
    validations.push(new NumberValidation('videoId', 1))
    validations.push(new BooleanValidation('isPositive'))
    return new ValidationComposite(validations)
}

export const makeAddVideoEvaluationController = () : AddVideoEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const addEvaluationService = new AddEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new AddVideoEvaluationController(makeAddVideoEvaluationValidation(), addEvaluationService)
}