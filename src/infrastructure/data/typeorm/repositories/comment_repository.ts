import { Comment } from "../../../../domain/entities/comment";
import {
  CommentRepositoryInterface,
  CreateCommentInterface,
} from "../../../../domain/repositories/comment_repository";
import { CommentEntity } from "../entities/comment";
import { UserEntity } from "../entities/user";
import { VideoEntity } from "../entities/video";

export class CommentRepository implements CommentRepositoryInterface {
  async changeEvaluations(
    id: number,
    isLike: boolean,
    isPositive: boolean
  ): Promise<void> {
    const comment = await CommentEntity.findOneBy({ id });
    if (!comment) throw new Error("Comment not found");
    if (isLike) {
      if (isPositive) comment.likesCount++;
      else comment.likesCount--;
    } else {
      if (isPositive) comment.deslikesCount++;
      else comment.deslikesCount--;
    }
    await comment.save();
  }
  async create(comment: CreateCommentInterface): Promise<Comment> {
    const newComment = new CommentEntity();
    newComment.content = comment.content;
    const user = await UserEntity.findOneBy({ id: comment.created_by });
    if (user) newComment.created_by = user;
    if (comment.video_id) {
      const video = await VideoEntity.findOneBy({ id: comment.video_id });
      if (video) newComment.video = video;
    }
    if (comment.comment_id) {
      const existingComment = await CommentEntity.findOneBy({
        id: comment.comment_id,
      });
      if (existingComment) newComment.comment = existingComment;
    }
    await newComment.save();
    return {
      id: newComment.id,
      content: newComment.content,
      created_by: {
        name: newComment.created_by.name,
        email: newComment.created_by.email,
        avatar: newComment.created_by.avatar,
      },
      createdAt: newComment.createdAt,
      video_id: newComment.videoId,
      comment_id: newComment.commentId,
    };
  }
  update(comment: Comment): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  async getById(id: number): Promise<Comment | null> {
    const comment = await CommentEntity.findOneBy({ id });
    if (!comment) return null;

    return {
      id: comment.id,
      created_by: {
        name: comment.created_by.name,
        email: comment.created_by.email,
        avatar: comment.created_by.avatar,
      },
      video_id: comment.videoId,
      comment_id: comment.commentId,
      likesCount: comment.likesCount,
      deslikesCount: comment.deslikesCount,
      content: comment.content,
    };
  }
  delete(id: number): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
}
