export interface ClearChatNotificationsInterface{
    userId: number
    chatNotificationsIds: number[]
}

export interface ClearChatNotifications{
    clear(infos: ClearChatNotificationsInterface): Promise<void>
}