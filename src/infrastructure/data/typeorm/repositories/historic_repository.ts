import { Historic, Video } from "../../../../domain/entities";
import { CreateHistoricInterface, GetByUserAndVideoInterface, GetUserHistoric, HistoricRepositoryInterface, UpdateHistoricInterface } from "../../../../domain/repositories";
import { HistoricEntity, UserEntity, VideoEntity } from "../entities";

function VideoMapToDomain(video: VideoEntity): Video {
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
      duration: video.duration
    };
}

function MapToDomain(hist: HistoricEntity): Historic {
    return {
        video: VideoMapToDomain(hist.video),
        watchedTime: hist.watchedTime,
        user: {
            name: hist.user.name,
            email: hist.user.email,
            avatar: hist.user.avatar,
            subsCount: hist.user.subsCount,
        },
        lastUpdate: hist.updatedAt,
        id: hist.id
    }
}

export class HistoricRepository implements HistoricRepositoryInterface{
    async get(infos: GetUserHistoric): Promise<Historic[]> {
        const historics = await HistoricEntity.find({
            where: {userId: infos.userId},
            skip: (infos.page - 1) * infos.rows,
            take: infos.rows,
            order: {updatedAt: "DESC"}
        })

        return historics.map((historic) => MapToDomain(historic))
    }
    async getByUserAndVideo(infos: GetByUserAndVideoInterface): Promise<Historic | null> {
        const historic = await HistoricEntity.findOneBy({
            videoId: infos.videoId,
            userId: infos.userId
        })
        return historic ? MapToDomain(historic) : null
    }   
    async create(infos: CreateHistoricInterface): Promise<Historic> {
        const newHistoric = new HistoricEntity()
        const existingVideo = await VideoEntity.findOneBy({id: infos.videoId})
        const existingUser = await UserEntity.findOneBy({id: infos.userId})
        if(!existingUser || !existingVideo)
            throw new Error()

        newHistoric.user = existingUser
        newHistoric.video = existingVideo
        newHistoric.watchedTime = infos.watchedTime
        await newHistoric.save()
        return MapToDomain(newHistoric)
    }
    async update(infos: UpdateHistoricInterface): Promise<Historic> {
        const historic = await HistoricEntity.findOneBy({
            id: infos.id
        })
        if(!historic)
            throw new Error()
        historic.watchedTime = infos.watchedTime
        await historic.save()
        return MapToDomain(historic)
    }
    
}