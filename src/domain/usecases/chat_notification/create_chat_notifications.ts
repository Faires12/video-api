import { ChatNotification } from "../../entities"

export interface CreateChatNotificationsInterface{
    excludeUsersEmails: string[]
    messageId: number
    chatId: number
}

export interface CreateChatNotifications{
    create(infos: CreateChatNotificationsInterface) : Promise<ChatNotification[]>
}