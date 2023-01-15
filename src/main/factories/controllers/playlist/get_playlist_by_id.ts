import { GetPlaylistByIdService } from "../../../../application/services"
import { PlaylistRepository, UserRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetPlaylistByIdController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetPlaylistByIdFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('id').number().min(1).getError()
        ]
    }
    controller(): Controller {
        const playlistRepository = new PlaylistRepository()
        const userRepository = new UserRepository()
        const getPlaylistByIdService = new GetPlaylistByIdService(playlistRepository, userRepository)
        return new GetPlaylistByIdController(getPlaylistByIdService)
    }
}
