import { EditCommentService } from "../../../../application/services"
import { CommentRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { EditCommentController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class EditCommentFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('content').string().minLength(5).maxLength(200).getError(),
            this.validation.builder.setField('id').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const userRepository = new UserRepository()
        const commentRepository = new CommentRepository()
        const editCommentService = new EditCommentService(userRepository, commentRepository)
        return new EditCommentController(editCommentService)
    }
}