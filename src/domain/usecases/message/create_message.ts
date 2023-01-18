import { Message } from "../../entities"

export interface CreateMessageInterface{
    content: string
    userId: number
    chatId: number
}

export interface CreateMessage{
    create(infos: CreateMessageInterface): Promise<Message>
}