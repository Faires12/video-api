import { CreateCommentService } from "../../../../application/services"
import { CommentRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateVideoCommentController } from "../../../../presentation/controllers"
import { makeCreateVideoCommentValidation } from "../../validations"


export const makeCreateVideoCommentController = () : CreateVideoCommentController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const createCommentService = new CreateCommentService(commentRepository, videoRepository)
    return new CreateVideoCommentController(makeCreateVideoCommentValidation(), createCommentService)
}