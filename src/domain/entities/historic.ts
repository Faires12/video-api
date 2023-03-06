import { AbstractEntity } from "./abstract_entity";
import { User } from "./user";
import { Video } from "./video";

export interface Historic extends AbstractEntity{
    video: Video
    user: User
    watchedTime: number
    lastUpdate: Date
}