import { Comment } from "../../../../domain/entities";
import {
  ChangeEvaluationsInterface,
  CommentRepositoryInterface,
  CreateCommentInterface,
  GetVideoCommentsInterface,
} from "../../../../domain/repositories";
import { CommentEntity, UserEntity } from "../entities";

export class CommentRepository implements CommentRepositoryInterface {
  async getByVideo(infos: GetVideoCommentsInterface): Promise<Comment[]> {
    const comments = await CommentEntity.find({
      where: { videoId: infos.videoId },
      take: infos.rows,
      skip: (infos.page - 1) * infos.rows,
    });
    for (const comment of comments) {
      const responses = await CommentEntity.find({
        where: { commentId: comment.id },
        take: 3,
        skip: 0,
      })
      comment.comments = responses;
    }
    return comments.map((c) => {
      return {
        id: c.id,
        created_by: {
          name: c.created_by.name,
          email: c.created_by.email,
          avatar: c.created_by.avatar,
        },
        content: c.content,
        likesCount: c.likesCount,
        deslikesCount: c.deslikesCount,
        responses: c.comments.map((c) => {
          return {
            id: c.id,
            created_by: {
              name: c.created_by.name,
              email: c.created_by.email,
              avatar: c.created_by.avatar,
            },
            content: c.content,
            likesCount: c.likesCount,
            deslikesCount: c.deslikesCount,
          };
        }),
      };
    });
  }

  async changeEvaluations(
    infos: ChangeEvaluationsInterface
  ): Promise<void> {
    const comment = await CommentEntity.findOneBy({ id: infos.id });
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
}
