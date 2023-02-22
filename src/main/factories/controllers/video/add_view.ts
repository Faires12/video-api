import { AddViewService } from "../../../../application/services"
import { VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddViewController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class AddViewFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('videoId').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const addViewService = new AddViewService(videoRepository)
        return new AddViewController(addViewService)
    }
}