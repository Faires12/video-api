import { Playlist } from "../../../domain/entities";
import { PlaylistRepositoryInterface, UserRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { ManageVideosInPlaylist, ManageVideosInPlaylistInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class ManageVideosInPlaylistService implements ManageVideosInPlaylist{
    constructor(private readonly playlistRepository: PlaylistRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface,
        private readonly userRepository: UserRepositoryInterface){}

    async manage(infos: ManageVideosInPlaylistInterface): Promise<Playlist> {
        const playlist = await this.playlistRepository.getById(infos.playlistId)
        const user = await this.userRepository.getById(infos.userId)
        if(!await this.videoRepository.getById(infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
        if(!playlist)
            throw new HttpException(HttpStatusCode.NotFound, "Playlist not found");
        if(playlist?.created_by.email !== user?.email)
            throw new HttpException(HttpStatusCode.Forbidden, "Playlist is not owned by the user");
        if(!infos.addVideo && !playlist.videos.find(v => v.id === infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found in playlist");
        if(infos.addVideo && playlist.videos.find(v => v.id === infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video already in playlist");

        if(infos.addVideo)
            return await this.playlistRepository.addVideo({videoId: infos.videoId, playlistId: infos.playlistId})
        else
            return await this.playlistRepository.removeVideo({videoId: infos.videoId, playlistId: infos.playlistId})
    }
    
}