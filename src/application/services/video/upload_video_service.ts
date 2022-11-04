import { Video } from "../../../domain/entities";
import { VideoRepositoryInterface } from "../../../domain/repositories";
import { UploadVideo, UploadVideoInterface } from "../../../domain/usecases";
import { SaveFileObject, UuidGenerator } from "../../interfaces";

export class UploadVideoService implements UploadVideo {
  constructor(
    private readonly videoRepository: VideoRepositoryInterface,
    private readonly saveFileObject: SaveFileObject,
    private readonly uuidGenerator: UuidGenerator 
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
    
    return await this.videoRepository.create({
      title: uploadVideo.title,
      description: uploadVideo.description,
      path,
      thumbnail,
      created_by: uploadVideo.userId,
    });
  }
}
