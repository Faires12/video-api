import { Playlist } from "../../../domain/entities";
import { PlaylistRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { ManageVideosInPlaylist } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class ManageVideosInPlaylistService implements ManageVideosInPlaylist{
    constructor(private readonly playlistRepository: PlaylistRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface){}

    async manage(userId: number, videoId: number, playlistId: number, addVideo: boolean): Promise<void> {
        const playlist = await this.playlistRepository.getById(playlistId)
        console.log(playlist)
        if(!await this.videoRepository.getById(videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found");
        if(!playlist)
            throw new HttpException(HttpStatusCode.NotFound, "Playlist not found");
        if(playlist?.created_by.id !== userId)
            throw new HttpException(HttpStatusCode.Forbidden, "Playlist is not owned by the user");
        if(!addVideo && !playlist.videos.find(v => v.id === videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video not found in playlist");
        if(addVideo && playlist.videos.find(v => v.id === videoId))
            throw new HttpException(HttpStatusCode.NotFound, "Video already in playlist");

        if(addVideo)
            await this.playlistRepository.addVideo(videoId, playlistId)
        else
            await this.playlistRepository.removeVideo(videoId, playlistId)
    }
    
}