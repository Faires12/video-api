import { GetVideoCommentsService } from "../../../../application/services"
import { CommentRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetVideoCommentsController } from "../../../../presentation/controllers"
import { makeGetVideoCommentsValidation } from "../../validations"


export const makeGetVideoCommentsController = () : GetVideoCommentsController => {
    const commentRepository = new CommentRepository()
    const videoRepository = new VideoRepository()
    const getVideoCommentsService = new GetVideoCommentsService(commentRepository, videoRepository)
    return new GetVideoCommentsController(makeGetVideoCommentsValidation(), getVideoCommentsService)
}