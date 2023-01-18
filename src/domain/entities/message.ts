import { AbstractEntity } from "./abstract_entity";
import { Chat } from "./chat";
import { User } from "./user";

export interface Message extends AbstractEntity {
    created_by: User
    content: string
    chat: Chat
}