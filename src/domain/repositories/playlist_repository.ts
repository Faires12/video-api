import { Playlist } from "../entities";

export interface CreatePlaylistInterface {
    title: string, userId: number, description?: string, videoId?: number
}

export interface ManageVideosInPlaylistInterface{
    videoId: number, playlistId: number
}

export interface PlaylistRepositoryInterface{
    create(playlist: CreatePlaylistInterface) : Promise<Playlist>
    addVideo(infos: ManageVideosInPlaylistInterface) : Promise<void>
    removeVideo(infos: ManageVideosInPlaylistInterface) : Promise<void>
    getById(id: number) : Promise<Playlist | null>
}