import { DeleteUserService, DeleteVideoService } from '../../../../application/services'
import { CommentRepository, UserRepository, VideoRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { DeleteUserController } from '../../../../presentation/controllers'
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class DeleteUserFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return []
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const videoRepository = new VideoRepository()
        const commentRepository = new CommentRepository()
        const deleteVideoService = new DeleteVideoService(videoRepository, userRepository, commentRepository)
        const deleteUserService = new DeleteUserService(userRepository, deleteVideoService, videoRepository)
        return new DeleteUserController(deleteUserService)
    }
}