import { Comment } from "../../../domain/entities";
import {
  CommentRepositoryInterface,
  UserRepositoryInterface,
} from "../../../domain/repositories";
import { EditComment, EditCommentInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class EditCommentService implements EditComment {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly commentRepository: CommentRepositoryInterface
  ) {}

  async edit(infos: EditCommentInterface): Promise<Comment> {
    const comment = await this.commentRepository.getById(infos.id);
    const user = await this.userRepository.getById(infos.userId);

    if (!comment)
      throw new HttpException(HttpStatusCode.NotFound, "Comment not found");
    if (user?.email !== comment?.created_by?.email)
      throw new HttpException(
        HttpStatusCode.Forbidden,
        "Comment is not owned by the user"
      );

    const editedComment = await this.commentRepository.edit({id: infos.id, content: infos.content})
    return editedComment
  }
}
