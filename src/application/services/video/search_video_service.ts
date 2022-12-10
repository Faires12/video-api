import { Video } from "../../../domain/entities";
import { VideoRepositoryInterface } from "../../../domain/repositories";
import { SearchVideos, SearchVideosInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { VideoOrderEnum } from "../../../utils/order_enums";

export class SearchVideosService implements SearchVideos {
  constructor(private readonly videoRepository: VideoRepositoryInterface) {}

  async search(infos: SearchVideosInterface): Promise<Video[]> {
    if (infos.orderBy && !(infos.orderBy in VideoOrderEnum))
      throw new HttpException(HttpStatusCode.NotFound, "Invalid order type");
    else if (!infos.orderBy) infos.orderBy = 1;

    return await this.videoRepository.search(infos);
  }
}
