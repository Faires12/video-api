import { DeleteVideoService } from "../../../../application/services"
import { CommentRepository, UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { DeleteVideoController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class DeleteVideoFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('id').number().min(1).getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const userRepository = new UserRepository()
        const commentRepository = new CommentRepository()
        const deleteVideoService = new DeleteVideoService(videoRepository, userRepository, commentRepository)
        return new DeleteVideoController(deleteVideoService)
    }
}