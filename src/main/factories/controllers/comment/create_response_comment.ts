import { CreateCommentService } from "../../../../application/services"
import { CommentRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateResponseCommentController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class CreateResponseCommentFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('content').string().minLength(5).maxLength(200).getError(),
            this.validation.builder.setField('commentId').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const commentRepository = new CommentRepository()
        const createCommentService = new CreateCommentService(commentRepository, videoRepository)
        return new CreateResponseCommentController(createCommentService)
    }
}
