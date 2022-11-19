import { GetUserPlaylistsService } from "../../../../application/services"
import { PlaylistRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetUserPlaylistsController } from "../../../../presentation/controllers"
import { ValidationComposite } from "../../../../presentation/validations"

export const makeGetUserPlaylistController = () : GetUserPlaylistsController => {
    const playlistRepository = new PlaylistRepository()
    const getUserPlaylistsService = new GetUserPlaylistsService(playlistRepository)

    return new GetUserPlaylistsController(new ValidationComposite([]), getUserPlaylistsService)
}