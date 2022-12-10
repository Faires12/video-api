import { Like, Not } from "typeorm";
import { Video } from "../../../../domain/entities";
import {
  CreateVideoInterface,
  VideoRepositoryInterface,
} from "../../../../domain/repositories";
import {
  ChangeCommentCountInterface,
  ChangeEvaluationsInterface,
  EditVideoRepositoryInterface,
  GetUserVideoRepositoryInterface,
  GetVideoRepositoryInterface,
  SearchVideosRepositoryInterface,
} from "../../../../domain/repositories/video_repository";
import { VideoOrderEnum } from "../../../../utils/order_enums";
import { UserEntity, VideoEntity } from "../entities";

function MapToDomain(video: VideoEntity): Video {
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

export class VideoRepository implements VideoRepositoryInterface {
  async search(infos: SearchVideosRepositoryInterface): Promise<Video[]> {
    const videos = await VideoEntity.find({
      where: infos.userId
        ? {
            userId: Not(infos.userId),
            active: true,
            title: Like(`%${infos.search}%`),
          }
        : { active: true, title: Like(`%${infos.search}%`) },
      skip: (infos.page - 1) * infos.rows,
      take: infos.rows,
      order:
        infos.orderBy === VideoOrderEnum.Views
          ? { viewsCount: "DESC" }
          : { createdAt: "DESC" },
    });
    return videos.map((video) => {
      return MapToDomain(video);
    });
  }
  async getAllUserVideos(userId: number): Promise<Video[]> {
    const videos = await VideoEntity.find({
      where: { userId: userId, active: true },
    });
    return videos.map((video) => {
      return MapToDomain(video);
    });
  }
  async delete(id: number): Promise<void> {
    const video = await VideoEntity.findOneBy({ id });
    if (video) {
      video.active = false;
      await video.save();
    }
  }
  async edit(infos: EditVideoRepositoryInterface): Promise<Video> {
    const video = await VideoEntity.findOneBy({ id: infos.id });
    if (!video) throw new Error("Video not found");

    if (infos.title) video.title = infos.title;
    if (infos.description) video.description = infos.description;
    if (infos.thumbnail) video.thumbnail = infos.thumbnail;
    await video.save();

    return MapToDomain(video);
  }
  async getVideos(infos: GetVideoRepositoryInterface): Promise<Video[]> {
    const videos = await VideoEntity.find({
      where: infos.excludeUserId
        ? { userId: Not(infos.excludeUserId), active: true }
        : infos.excludeVideoId
        ? { id: Not(infos.excludeVideoId), active: true }
        : { active: true },
      skip: (infos.page - 1) * infos.rows,
      take: infos.rows,
      order:
        infos.orderBy === VideoOrderEnum.Views
          ? { viewsCount: "DESC" }
          : { createdAt: "DESC" },
    });
    return videos.map((video) => {
      return MapToDomain(video);
    });
  }

  async getByUser(infos: GetUserVideoRepositoryInterface): Promise<Video[]> {
    const videos = await VideoEntity.find({
      where: { userId: infos.userId, active: true },
      skip: (infos.page - 1) * infos.rows,
      take: infos.rows,
      order:
        infos.orderBy === VideoOrderEnum.Views
          ? { viewsCount: "DESC" }
          : { createdAt: "DESC" },
    });
    return videos.map((video) => {
      return MapToDomain(video);
    });
  }
  async changeCommentCount(infos: ChangeCommentCountInterface): Promise<void> {
    const video = await VideoEntity.findOneBy({ id: infos.id, active: true });
    if (video) {
      if (infos.isPositive) video.commentCount++;
      else video.commentCount--;
      await video.save();
    }
  }

  async changeEvaluations(infos: ChangeEvaluationsInterface): Promise<void> {
    const video = await VideoEntity.findOneBy({ id: infos.id, active: true });
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
    return MapToDomain(videoEntity);
  }

  async getById(id: number): Promise<Video | null> {
    const video = await VideoEntity.findOneBy({ id, active: true });
    if (!video) return null;
    return MapToDomain(video);
  }
}
