import { Video } from "../../../../domain/entities/video";
import { CreateVideoInterface, VideoRepositoryInterface } from "../../../../domain/repositories/video_repository";
import { UserEntity } from "../entities/user";
import { VideoEntity } from "../entities/video";

export class VideoRepository implements VideoRepositoryInterface{
    async create(video: CreateVideoInterface): Promise<Video> {
        const videoEntity = new VideoEntity()
        
        videoEntity.title = video.title
        videoEntity.thumbnail = video.thumbnail
        videoEntity.path = video.path
        if(video.description)
            videoEntity.description = video.description
        const userEntity = await UserEntity.findOneBy({id: video.created_by})
        if(userEntity)
            videoEntity.created_by = userEntity

        await videoEntity.save()
        return {
            id: videoEntity.id,
            title: videoEntity.title,
            thumbnail: videoEntity.thumbnail,
            path: videoEntity.path,
            created_by: {id: videoEntity.created_by.id},
            createdAt: videoEntity.createdAt,
            description: videoEntity.description
        }
    }
    update(video: Video): Promise<Video> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Video[]> {
        throw new Error("Method not implemented.");
    }
    async getById(id: number): Promise<Video | null> {
        const video = await VideoEntity.findOneBy({id})
        if(!video)
            return null
        return {
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            path: video.path,
            created_by: {
                name: video.created_by.name,
                email: video.created_by.email,
                avatar: video.created_by.avatar
            },
            createdAt: video.createdAt,
            description: video.description,
            viewsCount: video.viewsCount,
            likesCount: video.likesCount,
            deslikesCount: video.deslikesCount
        }
    }
    delete(id: number): Promise<Video> {
        throw new Error("Method not implemented.");
    }
    
}