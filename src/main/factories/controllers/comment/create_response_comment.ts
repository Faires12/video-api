import { CreateCommentService } from "../../../../application/services"
import { CommentRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateResponseCommentController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreateResponseCommentValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['content', 'commentId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new StringValidation('content', 5, 200))
    validations.push(new NumberValidation('commentId', 1))
    return new ValidationComposite(validations)
}

export const makeCreateResponseCommentController = () : CreateResponseCommentController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const createCommentService = new CreateCommentService(commentRepository, videoRepository)
    return new CreateResponseCommentController(makeCreateResponseCommentValidation(), createCommentService)
}