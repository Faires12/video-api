import { Video } from "../../../../domain/entities";
import {
  CreateVideoInterface,
  VideoRepositoryInterface,
} from "../../../../domain/repositories";
import {
  ChangeCommentCountInterface,
  ChangeEvaluationsInterface,
  GetUserVideoRepositoryInterface,
} from "../../../../domain/repositories/video_repository";
import { VideoOrderEnum } from "../../../../utils/order_enums";
import { UserEntity, VideoEntity } from "../entities";

export class VideoRepository implements VideoRepositoryInterface {
  async getByUser(infos: GetUserVideoRepositoryInterface): Promise<Video[]> {
    const videos = await VideoEntity.find({
      where: { userId: infos.userId },
      skip: (infos.page - 1) * infos.rows,
      take: infos.rows,
      order:
        infos.orderBy === VideoOrderEnum.Views
          ? { viewsCount: "DESC" }
          : { createdAt: "DESC" },
    });
    return videos.map((video) => {
      return {
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        path: video.path,
        created_by: {
          name: video.created_by.name,
          email: video.created_by.email,
          avatar: video.created_by.avatar,
          subsCount: video.created_by.subsCount,
        },
        createdAt: video.createdAt,
        description: video.description,
        viewsCount: video.viewsCount,
        likesCount: video.likesCount,
        deslikesCount: video.deslikesCount,
        commentCount: video.commentCount,
      };
    });
  }
  async changeCommentCount(infos: ChangeCommentCountInterface): Promise<void> {
    const video = await VideoEntity.findOneBy({ id: infos.id });
    if (video) {
      if (infos.isPositive) video.commentCount++;
      else video.commentCount--;
      await video.save();
    }
  }

  async changeEvaluations(infos: ChangeEvaluationsInterface): Promise<void> {
    const video = await VideoEntity.findOneBy({ id: infos.id });
    if (!video) throw new Error("Comment not found");
    if (infos.isLike) {
      if (infos.isChange) {
        video.likesCount++;
        video.deslikesCount--;
      } else {
        if (infos.isPositive) video.likesCount++;
        else video.likesCount--;
      }
    } else {
      if (infos.isChange) {
        video.deslikesCount++;
        video.likesCount--;
      } else {
        if (infos.isPositive) video.deslikesCount++;
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
        subsCount: video.created_by.subsCount,
      },
      createdAt: video.createdAt,
      description: video.description,
      viewsCount: video.viewsCount,
      likesCount: video.likesCount,
      deslikesCount: video.deslikesCount,
      commentCount: video.commentCount,
    };
  }
}
