import { CreateCommentService } from "../../../../application/services"
import { CommentRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateVideoCommentController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreateVideoCommentValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['content', 'videoId']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new StringValidation('content', 5, 200))
    validations.push(new NumberValidation('videoId', 1))
    return new ValidationComposite(validations)
}

export const makeCreateVideoCommentController = () : CreateVideoCommentController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const createCommentService = new CreateCommentService(commentRepository, videoRepository)
    return new CreateVideoCommentController(makeCreateVideoCommentValidation(), createCommentService)
}