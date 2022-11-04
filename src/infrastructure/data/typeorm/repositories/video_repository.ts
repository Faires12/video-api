import { Video } from "../../../../domain/entities";
import { CreateVideoInterface, VideoRepositoryInterface } from "../../../../domain/repositories";
import { UserEntity, VideoEntity } from "../entities";

export class VideoRepository implements VideoRepositoryInterface {
  async changeEvaluations(
    id: number,
    isLike: boolean,
    isPositive: boolean,
    isChange?: boolean
  ): Promise<void> {
    const video = await VideoEntity.findOneBy({ id });
    if (!video) throw new Error("Comment not found");
    if (isLike) {
      if (isChange) {
        video.likesCount++;
        video.deslikesCount--;
      } else {
        if (isPositive) video.likesCount++;
        else video.likesCount--;
      }
    } else {
      if (isChange) {
        video.deslikesCount++;
        video.likesCount--;
      } else {
        if (isPositive) video.deslikesCount++;
        else video.deslikesCount--;
      }
    }
    await video.save();
  }

  async create(video: CreateVideoInterface): Promise<Video> {
    const videoEntity = new VideoEntity();

    videoEntity.title = video.title;
    videoEntity.thumbnail = video.thumbnail;
    videoEntity.path = video.path;
    if (video.description) videoEntity.description = video.description;
    const userEntity = await UserEntity.findOneBy({ id: video.created_by });
    if (userEntity) videoEntity.created_by = userEntity;

    await videoEntity.save();
    return {
      id: videoEntity.id,
      title: videoEntity.title,
      thumbnail: videoEntity.thumbnail,
      path: videoEntity.path,
      created_by: { id: videoEntity.created_by.id },
      createdAt: videoEntity.createdAt,
      description: videoEntity.description,
    };
  }

  update(video: Video): Promise<Video> {
    throw new Error("Method not implemented.");
  }

  getAll(): Promise<Video[]> {
    throw new Error("Method not implemented.");
  }

  async getById(id: number): Promise<Video | null> {
    const video = await VideoEntity.findOneBy({ id });
    if (!video) return null;
    return {
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      path: video.path,
      created_by: {
        name: video.created_by.name,
        email: video.created_by.email,
        avatar: video.created_by.avatar,
      },
      createdAt: video.createdAt,
      description: video.description,
      viewsCount: video.viewsCount,
      likesCount: video.likesCount,
      deslikesCount: video.deslikesCount,
    };
  }
  
  delete(id: number): Promise<Video> {
    throw new Error("Method not implemented.");
  }
}
