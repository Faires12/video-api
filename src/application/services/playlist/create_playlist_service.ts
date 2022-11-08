import { Playlist } from "../../../domain/entities";
import {
  PlaylistRepositoryInterface,
  VideoRepositoryInterface,
} from "../../../domain/repositories";
import {
  CreatePlaylist,
  CreatePlaylistInterface,
} from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class CreatePlaylistService implements CreatePlaylist {
  constructor(
    private readonly playlistRepository: PlaylistRepositoryInterface,
    private readonly videoRepository: VideoRepositoryInterface
  ) {}

  async create(infos: CreatePlaylistInterface): Promise<Playlist> {
    if (infos.videoId && !(await this.videoRepository.getById(infos.videoId)))
      throw new HttpException(HttpStatusCode.NotFound, "Video not found");
    return await this.playlistRepository.create({
      title: infos.title,
      userId: infos.userId,
      description: infos.description,
      videoId: infos.videoId,
    });
  }
}
