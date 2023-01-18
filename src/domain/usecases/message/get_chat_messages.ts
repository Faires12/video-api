import { Message } from "../../entities"

export interface GetChatMessagesInterface{
    userId: number
    chatId: number
    page: number
    rows: number
}

export interface GetChatMessages{
    get(infos: GetChatMessagesInterface): Promise<Message[]>
}