import { GetCommentResponsesService, GetVideoCommentsService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetCommentResponsesController, GetVideoCommentsController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetCommentResponsesValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['commentId', 'page', 'rows']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeGetCommentResponsesController = () : GetCommentResponsesController => {
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const getCommentResponsesService = new GetCommentResponsesService(commentRepository, evaluationRepository)
    return new GetCommentResponsesController(makeGetCommentResponsesValidation(), getCommentResponsesService)
}