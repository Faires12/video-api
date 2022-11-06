import { Playlist } from "../../entities";

export interface CreatePlaylist{
    create(title: string, userId: number, description?: string , videoId?: number) : Promise<Playlist>
}