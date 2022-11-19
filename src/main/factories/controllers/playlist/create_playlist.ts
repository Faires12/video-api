import { CreatePlaylistService } from "../../../../application/services"
import { PlaylistRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreatePlaylistController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, StringValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export function makeCreatePlaylistValidation() : Validation {
    const validations : Validation[] = []
    for(const fieldname of ['title']){
        validations.push(new RequiredFieldValidation(fieldname))
    }
    validations.push(new NumberValidation('videoId', 1))
    validations.push(new StringValidation('title', 3, 20))
    validations.push(new StringValidation('description', 5, 25))
    return new ValidationComposite(validations)
}

export const makeCreatePlaylistController = () : CreatePlaylistController => {
    const videoRepository = new VideoRepository()
    const playlistRepository = new PlaylistRepository()
    const createPlaylistService = new CreatePlaylistService(playlistRepository, videoRepository)

    return new CreatePlaylistController(makeCreatePlaylistValidation(), createPlaylistService)
}