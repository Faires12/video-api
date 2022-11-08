import { Playlist } from "../../../../domain/entities";
import { CreatePlaylistInterface, ManageVideosInPlaylistInterface, PlaylistRepositoryInterface } from "../../../../domain/repositories/playlist_repository";
import { PlaylistEntity, UserEntity, VideoEntity } from "../entities";

export class PlaylistRepository implements PlaylistRepositoryInterface {
  async getById(id: number): Promise<Playlist | null> {
    const playlist = await PlaylistEntity.findOne({
      where: { id },
      relations: ['videos']
    });
    if (!playlist) return null;

    return {
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      created_by: {
        name: playlist.created_by.name,
        email: playlist.created_by.email,
        avatar: playlist.created_by.avatar,
        id: playlist.created_by.id
      },
      videos: playlist.videos
        ? playlist.videos.map((v) => {
            return {
              id: v.id,
              title: v.title,
              description: v.description,
              thumbnail: v.thumbnail,
              path: v.path,
              created_by: {
                name: v.created_by.name,
                email: v.created_by.email,
                avatar: v.created_by.avatar
              },
            };
          })
        : [],
    };
  }
  async create(
    playlist: CreatePlaylistInterface
  ): Promise<Playlist> {
    const newPlaylist = new PlaylistEntity();
    newPlaylist.title = playlist.title;
    const user = await UserEntity.findOneBy({ id: playlist.userId });
    if (user) newPlaylist.created_by = user;
    if (playlist.description) newPlaylist.description = playlist.description;
    if (playlist.videoId) {
      const video = await VideoEntity.findOneBy({ id: playlist.videoId });
      if (video) {
        newPlaylist.videos = []
        newPlaylist.videos.push(video);
      }
    }
    await newPlaylist.save();
    console.log(newPlaylist.videos);
    return {
      id: newPlaylist.id,
      title: newPlaylist.title,
      description: newPlaylist.description,
      created_by: {
        name: newPlaylist.created_by.name,
        email: newPlaylist.created_by.email,
        avatar: newPlaylist.created_by.avatar,
      },
      videos: newPlaylist.videos
        ? newPlaylist.videos.map((v) => {
            return {
              id: v.id,
              title: v.title,
              description: v.description,
              thumbnail: v.thumbnail,
              path: v.path,
              created_by: {
                name: v.created_by.name,
                email: v.created_by.email,
                avatar: v.created_by.avatar,
              },
            };
          })
        : [],
    };
  }
  async addVideo(infos: ManageVideosInPlaylistInterface): Promise<void> {
    const playlist = await PlaylistEntity.findOne({where: { id: infos.playlistId }, relations: ['videos']});
    const video = await VideoEntity.findOneBy({ id: infos.videoId });
    if (playlist && video) {
      if(!playlist.videos)
        playlist.videos = []
      playlist.videos.push(video);
      await playlist.save(); 
    }
  }
  
  async removeVideo(infos: ManageVideosInPlaylistInterface): Promise<void> {
    const playlist = await PlaylistEntity.findOne({where: { id: infos.playlistId }, relations: ['videos']});
    const video = await VideoEntity.findOneBy({ id: infos.videoId });
    if (playlist && video) {
      const i = playlist.videos.findIndex((v) => v.id === infos.videoId);
      playlist.videos.splice(i, 1);
      await playlist.save();
    }
  }
}
