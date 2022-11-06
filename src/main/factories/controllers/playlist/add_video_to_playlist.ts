import { ManageVideosInPlaylistService } from "../../../../application/services/playlist/manage_videos_in_playlist_service"
import { PlaylistRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { AddVideoToPlaylistController } from "../../../../presentation/controllers"
import { makeManageVideoInPlaylistValidation } from "../../validations"


export const makeAddVideoToPlaylistController = () : AddVideoToPlaylistController => {
    const videoRepository = new VideoRepository()
    const playlistRepository = new PlaylistRepository()
    const manageVideosInPlaylistService = new ManageVideosInPlaylistService(playlistRepository, videoRepository)

    return new AddVideoToPlaylistController(makeManageVideoInPlaylistValidation(), manageVideosInPlaylistService)
}