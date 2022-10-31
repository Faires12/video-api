import { CreateCommentService } from "../../../application/services/create_comment_service"
import { CommentRepository } from "../../../infrastructure/data/typeorm/repositories/comment_repository"
import { VideoRepository } from "../../../infrastructure/data/typeorm/repositories/video_repository"
import { CreateResponseCommentController } from "../../../presentation/controllers/comment/create_response_comment_controller"
import makeCreateResponseCommentValidation from "../validations/craete_response_comment"

export const makeCreateResponseCommentController = () : CreateResponseCommentController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const createCommentService = new CreateCommentService(commentRepository, videoRepository)
    return new CreateResponseCommentController(makeCreateResponseCommentValidation(), createCommentService)
}