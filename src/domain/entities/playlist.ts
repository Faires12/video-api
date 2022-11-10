import { User, Video } from "./"
import { AbstractEntity } from "./abstract_entity"

export interface Playlist extends AbstractEntity{
    title: string
    description?: string
    created_by: User
    videos: Video[]
}