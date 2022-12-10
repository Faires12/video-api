import { DeleteCommentService } from "../../../../application/services"
import { CommentRepository, UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { DeleteCommentController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeDeleteCommentValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['id']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeDeleteCommentController = () : DeleteCommentController => {
    const userRepository = new UserRepository()
    const commentRepository = new CommentRepository()
    const videoRepository = new VideoRepository()
    const deleteCommentService = new DeleteCommentService(userRepository, commentRepository, videoRepository)
    return new DeleteCommentController(makeDeleteCommentValidation(), deleteCommentService)
}