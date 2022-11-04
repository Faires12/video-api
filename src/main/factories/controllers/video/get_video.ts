import { GetVideoService } from "../../../../application/services"
import { VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoController } from "../../../../presentation/controllers"
import { makeGetVideoValidation } from "../../validations"


export const makeGetVideoController = () : GetVideoController => {
    const videoRepository = new VideoRepository()
    const getVideoService = new GetVideoService(videoRepository)
    return new GetVideoController(makeGetVideoValidation(), getVideoService)
}