import { Playlist } from "../../../domain/entities";
import { PlaylistRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { GetPlaylist } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class GetPlaylistByIdService implements GetPlaylist{
    constructor(
        private readonly playlistRepository: PlaylistRepositoryInterface,
        private readonly userRepository: UserRepositoryInterface,
      ) {}

    async get(id: number, userId: number): Promise<Playlist> {
        const playlist = await this.playlistRepository.getById(id)
        const user = await this.userRepository.getById(userId)
        if(!playlist)
            throw new HttpException(HttpStatusCode.NotFound, "Playlist not found")
        else if(playlist.created_by.email !== user?.email)
            throw new HttpException(HttpStatusCode.Forbidden, "Playlist is not owned by the user")

        return playlist
    }

    
}