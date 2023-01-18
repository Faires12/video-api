import { Chat, User } from "../entities";

export interface CreateChatRepositoryInterface{
    created_by: number
    isPersonal: boolean
    otherUsers: User[]
    groupName?: string
}

export interface GetPersonalChatInterface{
    actualUser: number
    otherUser: User
}

export interface ChatRepositoryInterface{
    create(infos: CreateChatRepositoryInterface) : Promise<Chat>
    getPersonalChat(infos: GetPersonalChatInterface) : Promise<Chat | null>
    getUserChats(userId: number) : Promise<Chat[]>
    getById(id: number) : Promise<Chat | null>
}