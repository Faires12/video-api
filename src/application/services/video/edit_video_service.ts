import { Video } from "../../../domain/entities";
import {
  UserRepositoryInterface,
  VideoRepositoryInterface,
} from "../../../domain/repositories";
import { EditVideo, EditVideoInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { SaveFileObject, UuidGenerator } from "../../interfaces";

export class EditVideoService implements EditVideo {
  constructor(
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
    private readonly saveFileObject: SaveFileObject,
    private readonly uuidGenerator: UuidGenerator
  ) {}

  async edit(infos: EditVideoInterface): Promise<Video> {
    const video = await this.videoRepository.getById(infos.id);
    const user = await this.userRepository.getById(infos.userId);

    if (!video)
      throw new HttpException(HttpStatusCode.NotFound, "Video not found");
    if (user?.email !== video?.created_by?.email)
      throw new HttpException(
        HttpStatusCode.Forbidden,
        "Video is not owned by the user"
      );

    let thumbnail;
    if (infos.thumbnail)
      thumbnail = await this.saveFileObject.save(
        infos.thumbnail,
        this.uuidGenerator.generate()
      );

    const editedVideo = await this.videoRepository.edit({
      title: infos.title,
      description: infos.description,
      thumbnail,
      id: infos.id,
    });

    return editedVideo;
  }
}
