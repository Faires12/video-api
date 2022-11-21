import { Playlist } from "../../entities";

export interface GetPlaylist{
    get(id: number, userId: number): Promise<Playlist>
}