import { CreatePlaylistService } from "../../../../application/services"
import { PlaylistRepository, UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreatePlaylistController } from "../../../../presentation/controllers"
import { makeCreatePlaylistValidation } from "../../validations"


export const makeCreatePlaylistController = () : CreatePlaylistController => {
    const videoRepository = new VideoRepository()
    const playlistRepository = new PlaylistRepository()
    const createPlaylistService = new CreatePlaylistService(playlistRepository, videoRepository)

    return new CreatePlaylistController(makeCreatePlaylistValidation(), createPlaylistService)
}