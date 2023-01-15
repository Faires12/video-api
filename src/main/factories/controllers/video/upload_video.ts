import path from 'path'
import { UploadVideoService } from '../../../../application/services'
import { FileSystemAdapter, UuidAdapter } from '../../../../infrastructure/adapters'
import { VideoRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { UploadVideoController } from '../../../../presentation/controllers'
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class UploadVideoFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField('title').string().min(3).max(30).getError(),
            this.validation.builder.setField('description').string().min(5).max(200).optional().getError(),
            this.validation.builder.setField('thumbnail').file().maxSize(5).image().getError(),
            this.validation.builder.setField('video').file().maxSize(100).video().getError()
        ]
    }
    controller(): Controller {
        const videoRepository = new VideoRepository()
        const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
        const uuidAdapter = new UuidAdapter()
        const uploadVideoService = new UploadVideoService(videoRepository, fileSystemAdapter, uuidAdapter)
        return new UploadVideoController(uploadVideoService)
    }
}