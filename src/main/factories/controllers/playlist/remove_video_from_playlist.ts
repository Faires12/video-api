import { ManageVideosInPlaylistService } from "../../../../application/services"
import { PlaylistRepository, UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { RemoveVideoFromPlaylistController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class RemoveVideoFromPlaylistFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('videoId').number().min(1).getError(),
            this.validation.builder.setField('playlistId').number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const playlistRepository = new PlaylistRepository()
        const userRepository = new UserRepository()
        const manageVideosInPlaylistService = new ManageVideosInPlaylistService(playlistRepository, videoRepository, userRepository)
        return new RemoveVideoFromPlaylistController(manageVideosInPlaylistService)
    }
}