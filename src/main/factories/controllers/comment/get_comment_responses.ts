import { GetCommentResponsesService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetCommentResponsesController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetCommentResponsesFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('commentId').number().min(1).getError(),
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const commentRepository = new CommentRepository()
        const evaluationRepository = new EvaluationRepository()
        const getCommentResponsesService = new GetCommentResponsesService(commentRepository, evaluationRepository)
        return new GetCommentResponsesController(getCommentResponsesService)
    }
}
