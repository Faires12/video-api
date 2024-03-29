import path from 'path'
import { UploadVideoService } from '../../../../application/services'
import { FileSystemAdapter, UuidAdapter, VideoUtilsAdapter } from '../../../../infrastructure/adapters'
import { VideoRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { UploadVideoController } from '../../../../presentation/controllers'
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class UploadVideoFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('title').string().minLength(3).maxLength(30).getError(),
            this.validation.builder.setField('description').string().minLength(5).maxLength(200).optional().getError(),
            this.validation.builder.setField('thumbnail').file().maxSize(5).image().getError(),
            this.validation.builder.setField('video').file().maxSize(100).video().getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
        const uuidAdapter = new UuidAdapter()
        const videoUtilsAdapter = new VideoUtilsAdapter(path.join(__dirname, "../../../public/"))
        const uploadVideoService = new UploadVideoService(videoRepository, fileSystemAdapter, uuidAdapter, videoUtilsAdapter)
        return new UploadVideoController(uploadVideoService)
    }
}