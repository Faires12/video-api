import { ChatNotification } from "../../entities";

export interface GetChatNotifications{
    get(userId: number): Promise<ChatNotification[]>
}