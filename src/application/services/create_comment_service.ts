import { Comment } from "../../domain/entities/comment";
import { CommentRepositoryInterface } from "../../domain/repositories/comment_repository";
import { VideoRepositoryInterface } from "../../domain/repositories/video_repository";
import { CreateComment, CreateCommentInterface } from "../../domain/usecases/comment/create_comment";

export class CreateCommentService implements CreateComment{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}

    
    async create(comment: CreateCommentInterface): Promise<Comment | null> {
        if(comment.isVideo && !await this.videoRepository.getById(comment.referenceId))
            return null
        else if(!comment.isVideo){
            const existingComment = await this.commentRepository.getById(comment.referenceId)
            if(existingComment === null)
                return null
            if(!existingComment.video_id)
                return null
        }

        return await this.commentRepository.create({
            created_by: comment.userId,
            content: comment.content,
            video_id: comment.isVideo ? comment.referenceId : undefined,
            comment_id: !comment.isVideo ? comment.referenceId : undefined
        })
    }
}