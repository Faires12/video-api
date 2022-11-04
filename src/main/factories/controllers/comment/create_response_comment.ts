import { CreateCommentService } from "../../../../application/services"
import { CommentRepository, VideoRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { CreateResponseCommentController } from "../../../../presentation/controllers"
import { makeCreateResponseCommentValidation } from "../../validations"


export const makeCreateResponseCommentController = () : CreateResponseCommentController => {
    const videoRepository = new VideoRepository()
    const commentRepository = new CommentRepository()
    const createCommentService = new CreateCommentService(commentRepository, videoRepository)
    return new CreateResponseCommentController(makeCreateResponseCommentValidation(), createCommentService)
}