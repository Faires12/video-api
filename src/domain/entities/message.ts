import { AbstractEntity } from "./abstract_entity";
import { Chat } from "./chat";
import { User } from "./user";
import { Video } from "./video";

export interface Message extends AbstractEntity {
    created_by: User
    chat?: Chat
    content: string
    fileRef?: string
    videoRef?: Video
}