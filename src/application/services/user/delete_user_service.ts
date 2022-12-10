import { UserRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { DeleteUser, DeleteVideo } from "../../../domain/usecases";

export class DeleteUserService implements DeleteUser{
    constructor(private readonly userRepository: UserRepositoryInterface,
        private readonly deleteVideoService: DeleteVideo,
        private readonly videoRepository: VideoRepositoryInterface){}

    async delete(userId: number): Promise<void> {
        const videos = await this.videoRepository.getAllUserVideos(userId)
        for(const video of videos){
            if(!video.id)
                continue
            await this.deleteVideoService.delete({id: video.id, userId})
        }
        await this.userRepository.delete(userId)
    }
    
}