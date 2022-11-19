import { Playlist } from "../../../domain/entities";
import { PlaylistRepositoryInterface } from "../../../domain/repositories";
import { GetUserPlaylists } from "../../../domain/usecases";

export class GetUserPlaylistsService implements GetUserPlaylists{
    constructor(
        private readonly playlistRepository: PlaylistRepositoryInterface,
      ) {}

    async get(userId: number): Promise<Playlist[]> {
        return await this.playlistRepository.getByUser(userId)
    }  
}