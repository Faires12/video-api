import { EditVideoService } from "../../../../application/services"
import { FileSystemAdapter, UuidAdapter } from "../../../../infrastructure/adapters"
import { UserRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { EditVideoController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"
import path from 'path'

export class EditVideoFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('id').number().min(1).getError(),
            this.validation.builder.setField('title').string().min(3).max(30).optional().getError(),
            this.validation.builder.setField('description').string().min(5).max(200).optional().getError(),
            this.validation.builder.setField('thumbnail').file().maxSize(5).image().optional().getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const userRepository = new UserRepository()
        const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
        const uuidAdapter = new UuidAdapter()
        const editVideoService = new EditVideoService(videoRepository, userRepository, fileSystemAdapter, uuidAdapter)
        return new EditVideoController(editVideoService)
    }
}