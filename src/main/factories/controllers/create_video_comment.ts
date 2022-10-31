import { CreateCommentService } from "../../../application/services/create_comment_service"
import { CommentRepository } from "../../../infrastructure/data/typeorm/repositories/comment_repository"
import { VideoRepository } from "../../../infrastructure/data/typeorm/repositories/video_repository"
import { CreateVideoCommentController } from "../../../presentation/controllers/comment/create_video_comment_controller"
import makeCreateVideoCommentValidation from "../validations/craete_video_comment"

export const makeCreateVideoCommentController = () : CreateVideoCommentController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const createCommentService = new CreateCommentService(commentRepository, videoRepository)
    return new CreateVideoCommentController(makeCreateVideoCommentValidation(), createCommentService)
}