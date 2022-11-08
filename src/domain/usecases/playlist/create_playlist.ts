import { Playlist } from "../../entities";

export interface CreatePlaylistInterface {
  title: string;
  userId: number;
  description?: string;
  videoId?: number;
}

export interface CreatePlaylist {
  create(infos: CreatePlaylistInterface): Promise<Playlist>;
}
