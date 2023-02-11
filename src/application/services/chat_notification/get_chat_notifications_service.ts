import { ChatNotification } from "../../../domain/entities";
import { ChatNotificationRepositoryInterface } from "../../../domain/repositories";
import { GetChatNotifications } from "../../../domain/usecases";

export class GetChatNotificationsService implements GetChatNotifications{
    constructor(private readonly chatNotificationRepository: ChatNotificationRepositoryInterface){}

    async get(userId: number): Promise<ChatNotification[]> {
        return await this.chatNotificationRepository.getAllUserNotifications(userId)
    }   
}