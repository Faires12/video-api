import { UploadVideoService } from "../../../application/services/upload_video_service";
import { FileSystemAdapter } from "../../../infrastructure/adapters/file_system_adapter";
import { VideoRepository } from "../../../infrastructure/data/typeorm/repositories/video_repository";
import { UploadVideoController } from "../../../presentation/controllers/video/upload_video_controller";
import makeUploadVideoValidation from "../validations/upload_video";
import path from 'path'
import { UuidAdapter } from "../../../infrastructure/adapters/uuid_adapter";

export const makeUploadVideoController = () : UploadVideoController => {
    const videoRepository = new VideoRepository()
    const fileSystemAdapter = new FileSystemAdapter(path.join(__dirname, "../../public/"))
    const uuidAdapter = new UuidAdapter()
    const uploadVideoService = new UploadVideoService(videoRepository, fileSystemAdapter, uuidAdapter)
    return new UploadVideoController(makeUploadVideoValidation(), uploadVideoService)
}