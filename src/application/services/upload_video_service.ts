import { Video } from "../../domain/entities/video";
import { UserRepositoryInterface } from "../../domain/repositories/user_repository";
import { VideoRepositoryInterface } from "../../domain/repositories/video_repository";
import {
  UploadVideo,
  UploadVideoInterface,
} from "../../domain/usecases/video/upload_video";
import { SaveFileObject } from "../interfaces/SaveFileObject";
import { UuidGenerator } from "../interfaces/UuidGenerator";

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
