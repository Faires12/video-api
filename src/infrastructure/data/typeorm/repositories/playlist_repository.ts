import { Playlist } from "../../../../domain/entities";
import {
  CreatePlaylistInterface,
  ManageVideosInPlaylistInterface,
  PlaylistRepositoryInterface,
} from "../../../../domain/repositories/playlist_repository";
import { PlaylistEntity, UserEntity, VideoEntity } from "../entities";

export class PlaylistRepository implements PlaylistRepositoryInterface {
  async getByUser(userId: number): Promise<Playlist[]> {
    const playlists = await PlaylistEntity.find({
      where: { userId, active: true },
      relations: ["videos"],
    });
    return playlists.map((playlist) => {
      return {
        id: playlist.id,
        title: playlist.title,
        description: playlist.description,
        created_by: {
          name: playlist.created_by.name,
          email: playlist.created_by.email,
          avatar: playlist.created_by.avatar,
        },
        videos: playlist.videos
          ? playlist.videos.map((video) => {
              return {
                id: video.id,
                title: video.title,
                thumbnail: video.thumbnail,
                path: video.path,
                created_by: {
                  name: video.created_by.name,
                  email: video.created_by.email,
                  avatar: video.created_by.avatar,
                  subsCount: video.created_by.subsCount,
                },
                createdAt: video.createdAt,
                description: video.description,
                viewsCount: video.viewsCount,
                likesCount: video.likesCount,
                deslikesCount: video.deslikesCount,
                commentCount: video.commentCount,
              };
            })
          : [],
      };
    });
  }
  async getById(id: number): Promise<Playlist | null> {
    const playlist = await PlaylistEntity.findOne({
      where: { id, active: true},
      relations: ["videos"],
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
      },
      videos: playlist.videos
        ? playlist.videos.map((video) => {
            return {
              id: video.id,
              title: video.title,
              thumbnail: video.thumbnail,
              path: video.path,
              created_by: {
                name: video.created_by.name,
                email: video.created_by.email,
                avatar: video.created_by.avatar,
                subsCount: video.created_by.subsCount,
              },
              createdAt: video.createdAt,
              description: video.description,
              viewsCount: video.viewsCount,
              likesCount: video.likesCount,
              deslikesCount: video.deslikesCount,
              commentCount: video.commentCount,
            };
          })
        : [],
    };
  }
  async create(playlist: CreatePlaylistInterface): Promise<Playlist> {
    const newPlaylist = new PlaylistEntity();
    newPlaylist.title = playlist.title;
    const user = await UserEntity.findOneBy({ id: playlist.userId });
    if (user) newPlaylist.created_by = user;
    if (playlist.description) newPlaylist.description = playlist.description;
    if (playlist.videoId) {
      const video = await VideoEntity.findOneBy({ id: playlist.videoId });
      if (video) {
        newPlaylist.videos = [];
        newPlaylist.videos.push(video);
      }
    }
    await newPlaylist.save();

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
        ? newPlaylist.videos.map((video) => {
            return {
              id: video.id,
              title: video.title,
              thumbnail: video.thumbnail,
              path: video.path,
              created_by: {
                name: video.created_by.name,
                email: video.created_by.email,
                avatar: video.created_by.avatar,
                subsCount: video.created_by.subsCount,
              },
              createdAt: video.createdAt,
              description: video.description,
              viewsCount: video.viewsCount,
              likesCount: video.likesCount,
              deslikesCount: video.deslikesCount,
              commentCount: video.commentCount,
            };
          })
        : [],
    };
  }
  async addVideo(infos: ManageVideosInPlaylistInterface): Promise<Playlist> {
    const playlist = await PlaylistEntity.findOne({
      where: { id: infos.playlistId, active: true },
      relations: ["videos"],
    });
    const video = await VideoEntity.findOneBy({ id: infos.videoId });
    if (playlist && video) {
      if (!playlist.videos) playlist.videos = [];
      playlist.videos.push(video);
      await playlist.save();

      return {
        id: playlist.id,
        title: playlist.title,
        description: playlist.description,
        created_by: {
          name: playlist.created_by.name,
          email: playlist.created_by.email,
          avatar: playlist.created_by.avatar,
        },
        videos: playlist.videos
          ? playlist.videos.map((video) => {
              return {
                id: video.id,
                title: video.title,
                thumbnail: video.thumbnail,
                path: video.path,
                created_by: {
                  name: video.created_by.name,
                  email: video.created_by.email,
                  avatar: video.created_by.avatar,
                  subsCount: video.created_by.subsCount,
                },
                createdAt: video.createdAt,
                description: video.description,
                viewsCount: video.viewsCount,
                likesCount: video.likesCount,
                deslikesCount: video.deslikesCount,
                commentCount: video.commentCount,
              };
            })
          : [],
      };
    }

    throw new Error("");
  }

  async removeVideo(infos: ManageVideosInPlaylistInterface): Promise<Playlist> {
    const playlist = await PlaylistEntity.findOne({
      where: { id: infos.playlistId, active: true },
      relations: ["videos"],
    });
    const video = await VideoEntity.findOneBy({ id: infos.videoId });
    if (playlist && video) {
      const i = playlist.videos.findIndex((v) => v.id === infos.videoId);
      playlist.videos.splice(i, 1);
      await playlist.save();

      return {
        id: playlist.id,
        title: playlist.title,
        description: playlist.description,
        created_by: {
          name: playlist.created_by.name,
          email: playlist.created_by.email,
          avatar: playlist.created_by.avatar,
        },
        videos: playlist.videos
          ? playlist.videos.map((video) => {
              return {
                id: video.id,
                title: video.title,
                thumbnail: video.thumbnail,
                path: video.path,
                created_by: {
                  name: video.created_by.name,
                  email: video.created_by.email,
                  avatar: video.created_by.avatar,
                  subsCount: video.created_by.subsCount,
                },
                createdAt: video.createdAt,
                description: video.description,
                viewsCount: video.viewsCount,
                likesCount: video.likesCount,
                deslikesCount: video.deslikesCount,
                commentCount: video.commentCount,
              };
            })
          : [],
      };
    }

    throw new Error("");
  }
}
