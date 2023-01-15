import { GetEvaluationService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoEvaluationController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetVideoEvaluationFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('videoId').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const commentRepository = new CommentRepository()
        const evaluationRepository = new EvaluationRepository()
        const getEvaluationService = new GetEvaluationService(evaluationRepository, videoRepository, commentRepository)
        return new GetVideoEvaluationController(getEvaluationService)    
    }
}