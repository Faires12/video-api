import { DeleteUserService, DeleteVideoService } from '../../../../application/services'
import { CommentRepository, UserRepository, VideoRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { DeleteUserController } from '../../../../presentation/controllers'
import { ValidationComposite } from "../../../../presentation/validations"

export function makeDeleteUserController() : DeleteUserController {
    const userRepository = new UserRepository()
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const deleteVideoService = new DeleteVideoService(videoRepository, userRepository, commentRepository)
    const deleteUserService = new DeleteUserService(userRepository, deleteVideoService, videoRepository)
    return new DeleteUserController(new ValidationComposite([]), deleteUserService)
}