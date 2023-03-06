import { HistoricRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { AddVideoToHistoric, AddVideoToHistoricInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class AddVideoToHistoricService implements AddVideoToHistoric{
    constructor(private readonly videoRepository: VideoRepositoryInterface,
        private readonly historicRepository: HistoricRepositoryInterface){}

    async add(infos: AddVideoToHistoricInterface): Promise<void> {
        const existingVideo = await this.videoRepository.getById(infos.videoId)
        if(!existingVideo)
            throw new HttpException(HttpStatusCode.NotFound, "Video not found")
        const existingHistoric = await this.historicRepository.getByUserAndVideo({userId: infos.userId, videoId: infos.videoId})
        if(existingHistoric && existingHistoric.id){
            const diffDate = new Date().getTime() - new Date(existingHistoric.lastUpdate).getTime()
            const daysDiff = Math.ceil(diffDate / (1000 * 3600 * 24));
            if(daysDiff > 2){
                await this.historicRepository.create({
                    userId: infos.userId,
                    videoId: infos.videoId,
                    watchedTime: infos.watchedTime
                })            
            } else {
                await this.historicRepository.update({
                    id: existingHistoric.id,
                    watchedTime: infos.watchedTime
                })
            }  
            return
        }
        
        await this.historicRepository.create({
            userId: infos.userId,
            videoId: infos.videoId,
            watchedTime: infos.watchedTime
        })
    } 
}