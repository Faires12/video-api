import { GetEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoEvaluationController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeGetVideoEvaluationValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['videoId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('videoId', 1))
    return new ValidationComposite(validations)
}

export const makeGetVideoEvaluationController = () : GetVideoEvaluationController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const getEvaluationService = new GetEvaluationService(evaluationRepository, videoRepository, commentRepository)
    return new GetVideoEvaluationController(makeGetVideoEvaluationValidation(), getEvaluationService)
}