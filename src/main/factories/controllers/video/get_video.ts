import { GetVideoService } from "../../../../application/services"
import { EvaluationRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetVideoFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('id').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const evaluationRepository = new EvaluationRepository()
        const getVideoService = new GetVideoService(videoRepository, evaluationRepository)
        return new GetVideoController(getVideoService)
    }
}