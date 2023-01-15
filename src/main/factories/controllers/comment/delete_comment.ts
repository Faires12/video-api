import { DeleteCommentService } from "../../../../application/services"
import { CommentRepository, UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { DeleteCommentController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class DeleteCommentFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('id').number().min(1).getError()
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const commentRepository = new CommentRepository()
        const videoRepository = new VideoRepository()
        const deleteCommentService = new DeleteCommentService(userRepository, commentRepository, videoRepository)
        return new DeleteCommentController(deleteCommentService)
    }
}