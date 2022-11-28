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
    const { page, rows, videoId } = infos;

    const video = await this.videoRepository.getById(videoId)
    if(!video || !video.created_by?.email)
      throw new HttpException(HttpStatusCode.NotFound, "Video not found");

    const user = await this.userRepository.getByEmail(video.created_by.email);
    if (!user || !user.id)
      throw new HttpException(HttpStatusCode.NotFound, "User not found");

    const videos = await this.videoRepository.getVideos({
      excludeVideoId: video.id,
      rows: rows,
      page: page,
      orderBy: VideoOrderEnum.Recent
    });

    return videos;
  }
}
