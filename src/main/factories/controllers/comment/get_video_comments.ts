import { GetVideoCommentsService } from "../../../../application/services"
import { CommentRepository, EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoCommentsController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetVideoCommentsFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('videoId').number().min(1).getError(),
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const commentRepository = new CommentRepository()
        const videoRepository = new VideoRepository()
        const evaluationRepository = new EvaluationRepository()
        const getVideoCommentsService = new GetVideoCommentsService(commentRepository, videoRepository, evaluationRepository)
        return new GetVideoCommentsController(getVideoCommentsService)
    }
}