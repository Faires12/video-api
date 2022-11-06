
export interface ManageVideosInPlaylist{
    manage(userId: number, videoId: number, playlistId: number, addVideo: boolean) : Promise<void>
}