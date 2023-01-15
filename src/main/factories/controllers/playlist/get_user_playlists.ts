import { GetUserPlaylistsService } from "../../../../application/services"
import { PlaylistRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetUserPlaylistsController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetUserPlaylistsFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return []
    }
    controller(): Controller {
        const playlistRepository = new PlaylistRepository()
        const getUserPlaylistsService = new GetUserPlaylistsService(playlistRepository)
        return new GetUserPlaylistsController(getUserPlaylistsService)
    }
}