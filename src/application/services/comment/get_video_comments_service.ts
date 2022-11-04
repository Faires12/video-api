import { Comment } from "../../../domain/entities"
import { CommentRepositoryInterface, GetVideoCommentsInterface, VideoRepositoryInterface } from "../../../domain/repositories"
import { GetVideoComments } from "../../../domain/usecases"


export class GetVideoCommentsService implements GetVideoComments{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}

    async get(infos: GetVideoCommentsInterface): Promise<Comment[] | null> {
        if(!await this.videoRepository.getById(infos.videoId))
            return null
        return await this.commentRepository.getByVideo(infos)
    }
  
}