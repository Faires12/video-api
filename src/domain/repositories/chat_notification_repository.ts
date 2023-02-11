import { ChatNotification } from "../entities"

export interface CreateChatNotificationRepositoryInterface{
    messageId: number
    userEmail: string
    chatId: number
}

export interface AddMessageToNotificationRepositoryInterface{
    messageId: number
    userEmail: string
    chatId: number
}

export interface GetChatNotificationRepositoryInterface{
    userEmail: string
    chatId: number
}

export interface ChatNotificationRepositoryInterface{
    clear(id: number): Promise<void>
    getById(id: number) : Promise<ChatNotification | null>
    getAllUserNotifications(userId: number) : Promise<ChatNotification[]>
    get(infos: GetChatNotificationRepositoryInterface) : Promise<ChatNotification | null>
    create(infos: CreateChatNotificationRepositoryInterface): Promise<ChatNotification> 
    addMessageToNotification(infos: AddMessageToNotificationRepositoryInterface): Promise<ChatNotification> 
}