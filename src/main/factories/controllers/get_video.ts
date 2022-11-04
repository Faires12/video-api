import { GetVideoService } from "../../../application/services/get_video_service"
import { VideoRepository } from "../../../infrastructure/data/typeorm/repositories/video_repository"
import { GetVideoController } from "../../../presentation/controllers/video/get_video_controller"
import { makeGetVideoValidation } from "../validations/get_video"

export const makeGetVideoController = () : GetVideoController => {
    const videoRepository = new VideoRepository()
    const getVideoService = new GetVideoService(videoRepository)
    return new GetVideoController(makeGetVideoValidation(), getVideoService)
}