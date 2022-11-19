import { Video } from "../../../domain/entities";
import {
  UserRepositoryInterface,
  VideoRepositoryInterface,
} from "../../../domain/repositories";
import {
  GetRelatedVideos,
  GetRelatedVideosInterface,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { VideoOrderEnum } from "../../../utils/order_enums";

export class GetRelatedVideosService implements GetRelatedVideos {
  constructor(
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async get(infos: GetRelatedVideosInterface): Promise<Video[]> {
    const { page, rows, otherUserEmail } = infos;
    const user = await this.userRepository.getByEmail(otherUserEmail);
    if (!user || !user.id)
      throw new HttpException(HttpStatusCode.NotFound, "User not found");

    const videos: Video[] = [];

    const userRecentVideos = await this.videoRepository.getByUser({
      userId: user.id,
      rows: Math.floor(rows / 5),
      page: page,
      orderBy: VideoOrderEnum.Recent,
    });
    videos.push(...userRecentVideos);

    const userPopularVideos = await this.videoRepository.getByUser({
      userId: user.id,
      rows: Math.floor(rows / 5),
      page: page,
      orderBy: VideoOrderEnum.Views,
    });
    for (const video of userPopularVideos) {
      if (videos.find((v) => v.id === video.id)) continue;
      videos.push(video);
    }

    let numberOfVideos =
      videos.length === (2 * rows) / 5
        ? (3 * rows) / 5
        : (3 * rows) / 5 + ((2 * rows) / 5 - videos.length);

    const randomVideos = await this.videoRepository.getRandomVideos({
      amount: numberOfVideos,
      onlyUser: false,
      userId: user.id
    });
    for (const video of randomVideos) {
      if (videos.find((v) => v.id === video.id)) continue;
      videos.push(video);
    }

    return videos;
  }
}
