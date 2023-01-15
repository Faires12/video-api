import { GetUserVideosService } from "../../../../application/services"
import { UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetUserVideosController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetUserVideosFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
            this.validation.builder.setField('orderBy').number().min(1).optional().getError(),
            this.validation.builder.setField('email').string().email().getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const userRepository = new UserRepository()
        const getUserVideosService = new GetUserVideosService(videoRepository, userRepository)
        return new GetUserVideosController(getUserVideosService)
    }
}