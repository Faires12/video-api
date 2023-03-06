import { AddVideoToHistoricService } from "../../../../application/services"
import { HistoricRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddVideoToHistoricController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class AddVideoToHistoricFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField("userId").number().min(1).getError(),
            this.validation.builder.setField("videoId").number().min(1).getError(),
            this.validation.builder.setField("watchedTime").number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const historicRepository = new HistoricRepository()
        const addVideoToHistoricService = new AddVideoToHistoricService(videoRepository, historicRepository)
        return new AddVideoToHistoricController(addVideoToHistoricService)
    }
}