import { AbstractEntity } from "./abstract_entity";
import { Chat } from "./chat";
import { Message } from "./message";

export interface ChatNotification extends AbstractEntity{
    reciever: string
    messages: Message[]
    chat: Chat
    read: boolean
}