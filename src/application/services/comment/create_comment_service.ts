import { Comment } from "../../../domain/entities"
import { CommentRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories"
import { CreateComment, CreateCommentInterface } from "../../../domain/usecases"


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