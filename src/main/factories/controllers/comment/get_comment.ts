import { GetCommentService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetCommentController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetCommentValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['commentId']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeGetCommentController = () : GetCommentController => {
    const commentRepository = new CommentRepository()
    const evaluationRepository = new EvaluationRepository()
    const getCommentService = new GetCommentService(commentRepository, evaluationRepository)
    return new GetCommentController(makeGetCommentValidation(), getCommentService)
}