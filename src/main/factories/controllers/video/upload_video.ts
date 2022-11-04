import path from 'path'
import { UploadVideoService } from '../../../../application/services'
import { FileSystemAdapter, UuidAdapter } from '../../../../infrastructure/adapters'
import { VideoRepository } from '../../../../infrastructure/data/typeorm/repositories'
import { UploadVideoController } from '../../../../presentation/controllers'
import { makeUploadVideoValidation } from '../../validations'

export const makeUploadVideoController = () : UploadVideoController => {
    const videoRepository = new VideoRepository()
    const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../../public/"))
    const uuidAdapter = new UuidAdapter()
    const uploadVideoService = new UploadVideoService(videoRepository, fileSystemAdapter, uuidAdapter)
    return new UploadVideoController(makeUploadVideoValidation(), uploadVideoService)
}