import { AddEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddVideoEvaluationController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class AddVideoEvaluationFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('videoId').number().min(1).getError(),
            this.validation.builder.setField('isPositive').boolean().getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const commentRepository = new CommentRepository()
        const evaluationRepository = new EvaluationRepository()
        const addEvaluationService = new AddEvaluationService(evaluationRepository, videoRepository, commentRepository)
        return new AddVideoEvaluationController(addEvaluationService)
    }
}