import { Comment } from "../../../domain/entities"
import { CommentRepositoryInterface, GetVideoCommentsInterface, VideoRepositoryInterface } from "../../../domain/repositories"
import { GetVideoComments } from "../../../domain/usecases"
import { HttpException, HttpStatusCode } from "../../../utils/http";


export class GetVideoCommentsService implements GetVideoComments{
    constructor(private readonly commentRepository: CommentRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}

    async get(infos: GetVideoCommentsInterface): Promise<Comment[]> {
        if(!await this.videoRepository.getById(infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
        return await this.commentRepository.getByVideo(infos)
    }
  
}