import { ChatNotificationRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { ClearChatNotifications, ClearChatNotificationsInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class ClearChatNotificationsService implements ClearChatNotifications{
    constructor(private readonly userRepository: UserRepositoryInterface, 
        private readonly chatNotificationRepository: ChatNotificationRepositoryInterface){}

    async clear(infos: ClearChatNotificationsInterface): Promise<void> {
        const user = await this.userRepository.getById(infos.userId)
        if(!user)
            throw new HttpException(HttpStatusCode.NotFound, 'User not found')

        for(const id of infos.chatNotificationsIds){
            const chatNotification = await this.chatNotificationRepository.getById(id)
            if(!chatNotification)
                throw new HttpException(HttpStatusCode.NotFound, 'Chat notification not found')
            if(chatNotification.reciever !== user.email)
                throw new HttpException(HttpStatusCode.NotFound, 'Notification not for the user')
            await this.chatNotificationRepository.clear(id)
        }
    }
}