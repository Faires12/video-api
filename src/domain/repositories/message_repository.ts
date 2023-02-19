import { Message } from "../entities"

export interface CreateMessageRepositoryInterface{
    content: string
    user: number
    chat: number
    fileRef?: string
    videoId?: number
}

export interface GetChatMessagesRepositoryInterface{
    chatId: number
    page: number
    rows: number
}

export interface EditMessageRepositoryInterface{
    content: string
    messageId: number
}


export interface MessageRepositoryInterface{
    getById(id: number): Promise<Message | null>
    edit(infos: EditMessageRepositoryInterface): Promise<Message>
    create(infos: CreateMessageRepositoryInterface): Promise<Message>
    getChatMessages(infos: GetChatMessagesRepositoryInterface): Promise<Message[]>
}