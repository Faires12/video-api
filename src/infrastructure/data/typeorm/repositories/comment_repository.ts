import { Comment } from "../../../../domain/entities";
import {
  ChangeEvaluationsInterface,
  ChangeResponseCountInterface,
  CommentRepositoryInterface,
  CreateCommentInterface,
  EditCommentRepositoryInterface,
  GetCommentResponsesInterface,
  GetVideoCommentsInterface,
} from "../../../../domain/repositories";
import { CommentEntity, UserEntity } from "../entities";

export class CommentRepository implements CommentRepositoryInterface {
  async edit(infos: EditCommentRepositoryInterface): Promise<Comment> {
    const comment = await CommentEntity.findOneBy({id: infos.id})
    if(comment){
      comment.content = infos.content
      await comment.save()
      return comment
    }
    throw new Error('Comment not found')
  }
  async delete(id: number): Promise<void> {
    const comment = await CommentEntity.findOneBy({id})
    if(comment){
      comment.active = false
      await comment.save()
    }
  }
  async getByComment(infos: GetCommentResponsesInterface): Promise<Comment[]> {
    const comments = await CommentEntity.find({
      where: { commentId: infos.commentId, active: true },
      take: infos.rows,
      skip: (infos.page - 1) * infos.rows,
    });

    return comments.map((c) => {
      const res : Comment = {
        id: c.id,
        created_by: {
          name: c.created_by.name,
          email: c.created_by.email,
          avatar: c.created_by.avatar,
        },
        content: c.content,
        likesCount: c.likesCount,
        deslikesCount: c.deslikesCount,
        commentCount: c.commentCount,
        createdAt: c.createdAt
      };

      if(c.videoId){
        res.responses = []
        res.video_id = c.videoId
      }
      else
        res.comment_id = c.commentId
        
      return res
    });
  }
  async changeCommentCount(infos: ChangeResponseCountInterface): Promise<void> {
    const comment = await CommentEntity.findOneBy({id: infos.id, active: true})
    if(comment){
      if(infos.isPositive)
        comment.commentCount++
      else
        comment.commentCount--
      comment.save()
    }
  }
  async getByVideo(infos: GetVideoCommentsInterface): Promise<Comment[]> {
    const comments = await CommentEntity.find({
      where: { videoId: infos.videoId, active: true },
      take: infos.rows,
      skip: (infos.page - 1) * infos.rows,
    });

    return comments.map((c) => {
      const res : Comment = {
        id: c.id,
        created_by: {
          name: c.created_by.name,
          email: c.created_by.email,
          avatar: c.created_by.avatar,
        },
        content: c.content,
        likesCount: c.likesCount,
        deslikesCount: c.deslikesCount,
        commentCount: c.commentCount,
        createdAt: c.createdAt
      };

      if(c.videoId){
        res.responses = []
        res.video_id = c.videoId
      }
      else
        res.comment_id = c.commentId

      return res
    });
  }

  async changeEvaluations(
    infos: ChangeEvaluationsInterface
  ): Promise<void> {
    const comment = await CommentEntity.findOneBy({ id: infos.id, active: true });
    if (!comment) throw new Error("Comment not found");
    if (infos.isLike) {
      if (infos.isChange) {
        comment.likesCount++;
        comment.deslikesCount--;
      } else {
        if (infos.isPositive) comment.likesCount++;
        else comment.likesCount--;
      }
    } else {
      if (infos.isChange) {
        comment.deslikesCount++;
        comment.likesCount--;
      } else {
        if (infos.isPositive) comment.deslikesCount++;
        else comment.deslikesCount--;
      }
    }
    await comment.save();
  }
  async create(comment: CreateCommentInterface): Promise<Comment> {
    const newComment = new CommentEntity();
    newComment.content = comment.content;
    const user = await UserEntity.findOneBy({ id: comment.created_by });
    if (user) newComment.created_by = user;
    if (comment.video_id) newComment.videoId = comment.video_id;
    if (comment.comment_id) newComment.commentId = comment.comment_id;

    await newComment.save();
    
    const c : Comment = {
      id: newComment.id,
      created_by: {
        name: newComment.created_by.name,
        email: newComment.created_by.email,
        avatar: newComment.created_by.avatar,
      },
      content: newComment.content,
      likesCount: newComment.likesCount,
      deslikesCount: newComment.deslikesCount,
      commentCount: newComment.commentCount,
      createdAt: newComment.createdAt
    };

    if(newComment.videoId){
      c.responses = []
      c.video_id = newComment.videoId
    }
    else
      c.comment_id = newComment.commentId
      
    return c
  }
  async getById(id: number): Promise<Comment | null> {
    const comment = await CommentEntity.findOneBy({ id, active: true });
    if (!comment) return null;

    const c : Comment = {
      id: comment.id,
      created_by: {
        name: comment.created_by.name,
        email: comment.created_by.email,
        avatar: comment.created_by.avatar,
      },
      content: comment.content,
      likesCount: comment.likesCount,
      deslikesCount: comment.deslikesCount,
      commentCount: comment.commentCount,
      createdAt: comment.createdAt
    };

    if(comment.videoId){
      c.responses = []
      c.video_id = comment.videoId
    }
    else
      c.comment_id = comment.commentId
      
    return c
  }
}
