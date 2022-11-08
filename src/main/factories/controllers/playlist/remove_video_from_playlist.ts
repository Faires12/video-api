import { ManageVideosInPlaylistService } from "../../../../application/services"
import { PlaylistRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { RemoveVideoFromPlaylistController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeManageVideoInPlaylistValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['videoId', 'playlistId']){
        validations.push(new RequiredFieldValidation(fieldname))
        validations.push(new NumberValidation(fieldname, 1))
    }
    return new ValidationComposite(validations)
}

export const makeRemoveVideoFromPlaylistController = () : RemoveVideoFromPlaylistController => {
    const videoRepository = new VideoRepository()
    const playlistRepository = new PlaylistRepository()
    const manageVideosInPlaylistService = new ManageVideosInPlaylistService(playlistRepository, videoRepository)

    return new RemoveVideoFromPlaylistController(makeManageVideoInPlaylistValidation(), manageVideosInPlaylistService)
}