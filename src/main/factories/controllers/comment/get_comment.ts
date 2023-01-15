import { GetCommentService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetCommentController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetCommentFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('commentId').number().min(1).getError()
        ]
    }
    controller(): Controller {
        const commentRepository = new CommentRepository()
        const evaluationRepository = new EvaluationRepository()
        const getCommentService = new GetCommentService(commentRepository, evaluationRepository)
        return new GetCommentController(getCommentService)
    }
}
