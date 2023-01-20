import { SearchVideosService } from "../../../../application/services"
import { VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import {  SearchVideosController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class SearchVideosFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('page').number().min(1).getError(),
            this.validation.builder.setField('rows').number().min(1).getError(),
            this.validation.builder.setField('orderBy').number().min(1).optional().getError(),
            this.validation.builder.setField('search').string().minLength(1).maxLength(50).getError(),
            this.validation.builder.setField('includeUserVideos').boolean().optional().getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const searchVideosService = new SearchVideosService(videoRepository)
        return new SearchVideosController(searchVideosService)
    }
}