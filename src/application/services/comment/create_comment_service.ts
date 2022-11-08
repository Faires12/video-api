import { Comment } from "../../../domain/entities"
import { CommentRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories"
import { CreateComment, CreateCommentInterface } from "../../../domain/usecases"
import { HttpException, HttpStatusCode } from "../../../utils/http";


export class CreateCommentService implements CreateComment{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}
    
    async create(comment: CreateCommentInterface): Promise<Comment> {
        if(comment.isVideo && !await this.videoRepository.getById(comment.referenceId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
        else if(!comment.isVideo){
            const existingComment = await this.commentRepository.getById(comment.referenceId)
            if(existingComment === null)
                throw new HttpException(HttpStatusCode.NotFound, "Comment not found");
            if(!existingComment.video_id)
                throw new HttpException(HttpStatusCode.BadRequest, "Only main comment can be responded");
        }

        return await this.commentRepository.create({
            created_by: comment.userId,
            content: comment.content,
            video_id: comment.isVideo ? comment.referenceId : undefined,
            comment_id: !comment.isVideo ? comment.referenceId : undefined
        })
    }

    
    
}