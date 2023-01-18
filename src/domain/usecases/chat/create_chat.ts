import { Chat } from "../../entities"

export interface CreateChatInterface{
    userId: number
    isPersonal: boolean
    otherUsersEmails: string[]
    groupName?: string
}

export interface CreateChat{
    create(infos: CreateChatInterface) : Promise<Chat>
}