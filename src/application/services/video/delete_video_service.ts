import {
  CommentRepositoryInterface,
  UserRepositoryInterface,
  VideoRepositoryInterface,
} from "../../../domain/repositories";
import { DeleteVideo, DeleteVideoInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class DeleteVideoService implements DeleteVideo {
  constructor(
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
    private readonly commentRepository: CommentRepositoryInterface
  ) {}

  async delete(infos: DeleteVideoInterface): Promise<void> {
    const video = await this.videoRepository.getById(infos.id);
    const user = await this.userRepository.getById(infos.userId);

    if (!video)
      throw new HttpException(HttpStatusCode.NotFound, "Video not found");
    if (user?.email !== video?.created_by?.email)
      throw new HttpException(
        HttpStatusCode.Forbidden,
        "Video is not owned by the user"
      );

    await this.videoRepository.delete(infos.id);
    const comments = await this.commentRepository.getByVideo({
      page: 1,
      rows: video.commentCount ?? 1,
      videoId: infos.id,
    });
    
    for (const comment of comments) {
      if (!comment || !comment.id) continue;
      await this.commentRepository.delete(comment.id);
      if (comment.responses) {
        for (const response of comment.responses) {
          if (!response || !response.id) continue;
          await this.commentRepository.delete(response.id);
        }
      }
    }
  }
}
