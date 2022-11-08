export interface ManageVideosInPlaylistInterface {
  userId: number;
  videoId: number;
  playlistId: number;
  addVideo: boolean;
}

export interface ManageVideosInPlaylist {
  manage(
    infos: ManageVideosInPlaylistInterface
  ): Promise<void>;
}
