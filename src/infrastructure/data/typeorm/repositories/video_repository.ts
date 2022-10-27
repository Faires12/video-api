import { Video } from "../../../../domain/entities/video";
import { VideoRepositoryInterface } from "../../../../domain/repositories/video_repository";
import { UserEntity } from "../entities/user";
import { VideoEntity } from "../entities/video";

export class VideoRepository implements VideoRepositoryInterface{
    async create(video: Video): Promise<Video> {
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
            id: video.id,
            title: videoEntity.title,
            thumbnail: videoEntity.thumbnail,
            path: videoEntity.path,
            created_by: videoEntity.created_by.id,
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
    getById(id: number): Promise<Video | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Video> {
        throw new Error("Method not implemented.");
    }
    
}