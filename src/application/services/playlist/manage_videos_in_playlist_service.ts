import { PlaylistRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { ManageVideosInPlaylist, ManageVideosInPlaylistInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class ManageVideosInPlaylistService implements ManageVideosInPlaylist{
    constructor(private readonly playlistRepository: PlaylistRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}

    async manage(infos: ManageVideosInPlaylistInterface): Promise<void> {
        const playlist = await this.playlistRepository.getById(infos.playlistId)

        if(!await this.videoRepository.getById(infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
        if(!playlist)
            throw new HttpException(HttpStatusCode.NotFound, "Playlist not found");
        if(playlist?.created_by.id !== infos.userId)
            throw new HttpException(HttpStatusCode.Forbidden, "Playlist is not owned by the user");
        if(!infos.addVideo && !playlist.videos.find(v => v.id === infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found in playlist");
        if(infos.addVideo && playlist.videos.find(v => v.id === infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video already in playlist");

        if(infos.addVideo)
            await this.playlistRepository.addVideo({videoId: infos.videoId, playlistId: infos.playlistId})
        else
            await this.playlistRepository.removeVideo({videoId: infos.videoId, playlistId: infos.playlistId})
    }
    
}