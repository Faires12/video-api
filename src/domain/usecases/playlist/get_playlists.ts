import { Playlist } from "../../entities";

export interface GetUserPlaylists{
    get(userId: number) : Promise<Playlist[]>
}