import { CreatePlaylistService } from "../../../../application/services"
import { PlaylistRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreatePlaylistController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class CreatePlaylistFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('title').string().minLength(3).maxLength(20).getError(),
            this.validation.builder.setField('description').string().minLength(5).maxLength(25).optional().getError(),
            this.validation.builder.setField('videoId').number().min(1).optional().getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const playlistRepository = new PlaylistRepository()
        const createPlaylistService = new CreatePlaylistService(playlistRepository, videoRepository)
        return new CreatePlaylistController(createPlaylistService)
    }
}

