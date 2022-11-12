import { GetVideoCommentsService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoCommentsController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetVideoCommentsValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['videoId', 'page', 'rows']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeGetVideoCommentsController = () : GetVideoCommentsController => {
    const commentRepository = new CommentRepository()
    const videoRepository = new VideoRepository()
    const evaluationRepository = new EvaluationRepository()
    const getVideoCommentsService = new GetVideoCommentsService(commentRepository, videoRepository, evaluationRepository)
    return new GetVideoCommentsController(makeGetVideoCommentsValidation(), getVideoCommentsService)
}