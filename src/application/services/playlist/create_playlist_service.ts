import { Playlist } from "../../../domain/entities";
import { UserRepositoryInterface, PlaylistRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { CreatePlaylist } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class CreatePlaylistService implements CreatePlaylist{
    constructor(private readonly playlistRepository: PlaylistRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}
    
    async create(title: string, userId: number, description?: string | undefined, videoId?: number | undefined): Promise<Playlist> {
        if(videoId && !await this.videoRepository.getById(videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");  
        return await this.playlistRepository.create(title, userId, description, videoId)
    }
}