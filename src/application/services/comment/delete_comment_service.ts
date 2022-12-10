import {
    CommentRepositoryInterface,
    UserRepositoryInterface,
    VideoRepositoryInterface,
  } from "../../../domain/repositories";
  import { DeleteComment, DeleteVideoInterface } from "../../../domain/usecases";
  import { HttpException, HttpStatusCode } from "../../../utils/http";
  
  export class DeleteCommentService implements DeleteComment {
    constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface,
      private readonly videoRepository: VideoRepositoryInterface
    ) {}
  
    async delete(infos: DeleteVideoInterface): Promise<void> {
      const comment = await this.commentRepository.getById(infos.id);
      const user = await this.userRepository.getById(infos.userId);
  
      if (!comment)
        throw new HttpException(HttpStatusCode.NotFound, "Comment not found");
      if (user?.email !== comment?.created_by?.email)
        throw new HttpException(
          HttpStatusCode.Forbidden,
          "Comment is not owned by the user"
        );
  
      await this.commentRepository.delete(infos.id);
      const comments = await this.commentRepository.getByComment({
        page: 1,
        rows: comment.commentCount ?? 1,
        commentId: infos.id,
      });
      
      for (const comment of comments) {
        if (!comment || !comment.id) continue;
        await this.commentRepository.delete(comment.id);
      }

      if(comment.comment_id){
        await this.commentRepository.changeCommentCount({id: comment.comment_id, isPositive: false})
      } else if(comment.video_id){
        await this.videoRepository.changeCommentCount({id: comment.video_id, isPositive: false})
      }
    }
  }
  