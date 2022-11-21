import { GetPlaylistByIdService } from "../../../../application/services"
import { PlaylistRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetPlaylistByIdController } from "../../../../presentation/controllers"
import { NumberValidation, RequiredFieldValidation, Validation, ValidationComposite } from "../../../../presentation/validations"

export const makeGetPlaylistByIdValidation = () : Validation => {
    const validations : Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validations.push(new NumberValidation('id', 1))
    return new ValidationComposite(validations)
}
 
export const makeGetPlaylistByIdController = () : GetPlaylistByIdController => {
    const playlistRepository = new PlaylistRepository()
    const userRepository = new UserRepository()
    const getPlaylistByIdService = new GetPlaylistByIdService(playlistRepository, userRepository)

    return new GetPlaylistByIdController(makeGetPlaylistByIdValidation(), getPlaylistByIdService)
}