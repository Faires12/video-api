import { Message } from "../entities"

export interface CreateMessageRepositoryInterface{
    content: string
    user: number
    chat: number
}

export interface GetChatMessagesRepositoryInterface{
    chatId: number
    page: number
    rows: number
}


export interface MessageRepositoryInterface{
    create(infos: CreateMessageRepositoryInterface): Promise<Message>
    getChatMessages(infos: GetChatMessagesRepositoryInterface): Promise<Message[]>
}