import { Message } from "../../entities"

export interface EditMessageInterface{
    messageId: number
    userId: number
    content: string
}

export interface EditMessage{
    edit(infos: EditMessageInterface): Promise<Message>
}