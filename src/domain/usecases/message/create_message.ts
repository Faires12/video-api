import { Message } from "../../entities"

export interface CreateMessageInterface{
    content: string
    userId: number
    chatId: number
    file?: string
    videoId?: number
}

export interface CreateMessage{
    create(infos: CreateMessageInterface): Promise<Message>
}