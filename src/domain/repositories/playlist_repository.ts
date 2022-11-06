import { Playlist } from "../entities";

export interface PlaylistRepositoryInterface{
    create(title: string, userId: number, description?: string, videoId?: number) : Promise<Playlist>
    addVideo(videoId: number, playlistId: number) : Promise<void>
    removeVideo(videoId: number, playlistId: number) : Promise<void>
    getById(id: number) : Promise<Playlist | null>
}