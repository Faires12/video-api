import { Comment } from "../../domain/entities/comment";
import { CommentRepositoryInterface, GetVideoCommentsInterface } from "../../domain/repositories/comment_repository";
import { VideoRepositoryInterface } from "../../domain/repositories/video_repository";
import { GetVideoComments } from "../../domain/usecases/comment/get_video_comments";

export class GetVideoCommentsService implements GetVideoComments{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}
    
    async get(infos: GetVideoCommentsInterface): Promise<Comment[] | null> {
        if(!await this.videoRepository.getById(infos.videoId))
            return null
        return this.commentRepository.getByVideo(infos)
    }

}