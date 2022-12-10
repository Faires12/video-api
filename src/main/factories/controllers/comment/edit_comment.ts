import { EditCommentService } from "../../../../application/services"
import { CommentRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { EditCommentController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeEditCommentValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['id', 'content']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('id', 1))
    validations.push(new StringValidation('content', 5, 200))
    return new ValidationComposite(validations)
}

export const makeEditCommentController = () : EditCommentController => {
    const userRepository = new UserRepository()
    const commentRepository = new CommentRepository()
    const editCommentService = new EditCommentService(userRepository, commentRepository)
    return new EditCommentController(makeEditCommentValidation(), editCommentService)
}