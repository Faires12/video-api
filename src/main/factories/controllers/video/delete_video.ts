import { DeleteVideoService } from "../../../../application/services"
import { CommentRepository, UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { DeleteVideoController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeDeleteVideoValidation = () : Validation => {
    const validations : Validation[] = []
    for(const fieldname of ['id']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeDeleteVideoController = () : DeleteVideoController => {
    const videoRepository = new VideoRepository()
    const userRepository = new UserRepository()
    const commentRepository = new CommentRepository()
    const deleteVideoService = new DeleteVideoService(videoRepository, userRepository, commentRepository)
    return new DeleteVideoController(makeDeleteVideoValidation(), deleteVideoService)
}