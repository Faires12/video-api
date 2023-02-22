import { VideoRepositoryInterface } from "../../../domain/repositories";
import { AddView } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class AddViewService implements AddView{
    constructor(private readonly videoRepository: VideoRepositoryInterface){}

    async add(videoId: number): Promise<void> {
        const video = await this.videoRepository.getById(videoId)
        if(!video)
            throw new HttpException(HttpStatusCode.NotFound, 'Video not found')
            
        await this.videoRepository.addView(videoId)
    }
}