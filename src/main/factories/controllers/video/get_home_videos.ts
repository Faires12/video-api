import { GetHomeVideosService } from "../../../../application/services"
import { VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetHomeVideosController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetHomeVideosFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const getHomeVideosService = new GetHomeVideosService(videoRepository)
        return new GetHomeVideosController(getHomeVideosService)
    }
}