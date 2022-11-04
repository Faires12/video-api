import { GetVideoCommentsService } from "../../../application/services/get_video_comments_service"
import { CommentRepository } from "../../../infrastructure/data/typeorm/repositories/comment_repository"
import { VideoRepository } from "../../../infrastructure/data/typeorm/repositories/video_repository"
import { GetVideoCommentsController } from "../../../presentation/controllers/comment/get_video_comments_controller"
import { makeGetVideoCommentsValidation } from "../validations/get_video_comments"

export const makeGetVideoCommentsController = () : GetVideoCommentsController => {
    const commentRepository = new CommentRepository()
    const videoRepository = new VideoRepository()
    const getVideoCommentsService = new GetVideoCommentsService(commentRepository, videoRepository)
    return new GetVideoCommentsController(makeGetVideoCommentsValidation(), getVideoCommentsService)
}