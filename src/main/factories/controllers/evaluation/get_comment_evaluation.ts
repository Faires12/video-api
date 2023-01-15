import { GetEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetCommentEvaluationController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetCommentEvaluationFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('commentId').number().min(1).getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const commentRepository = new CommentRepository()
        const evaluationRepository = new EvaluationRepository()
        const getEvaluationService = new GetEvaluationService(evaluationRepository, videoRepository, commentRepository)
        return new GetCommentEvaluationController(getEvaluationService)
    }
}
