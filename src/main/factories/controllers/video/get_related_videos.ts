import { GetRelatedVideosService } from "../../../../application/services"
import { UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetRelatedVideosController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetRelatedVideosFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
            this.validation.builder.setField('videoId').number().min(1).getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const userRepository = new UserRepository()
        const getRelatedVideosService = new GetRelatedVideosService(videoRepository, userRepository)
        return new GetRelatedVideosController(getRelatedVideosService)
    }
}