import { User, Video } from "./"

export interface Playlist{
    title: string
    description?: string
    created_by: User
    videos: Video[]
    id?: number
}