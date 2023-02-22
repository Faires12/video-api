import { Video } from "../../../domain/entities";
import { VideoRepositoryInterface } from "../../../domain/repositories";
import { UploadVideo, UploadVideoInterface } from "../../../domain/usecases";
import { GetVideoDuration, SaveFileObject, UuidGenerator } from "../../interfaces";

export class UploadVideoService implements UploadVideo {
  constructor(
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly saveFileObject: SaveFileObject,
    private readonly uuidGenerator: UuidGenerator,
    private readonly getVideoDuration: GetVideoDuration
  ) {}

  async upload(uploadVideo: UploadVideoInterface): Promise<Video> {
    const path = await this.saveFileObject.save(
      uploadVideo.file,
      this.uuidGenerator.generate()
    );
    const thumbnail = await this.saveFileObject.save(
      uploadVideo.thumbnail,
      this.uuidGenerator.generate()
    );
    const duration = await this.getVideoDuration.get(path)
    
    return await this.videoRepository.create({
      title: uploadVideo.title,
      description: uploadVideo.description,
      path,
      thumbnail,
      created_by: uploadVideo.userId,
      duration: duration
    });
  }
}
