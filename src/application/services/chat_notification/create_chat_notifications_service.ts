import { ChatNotification } from "../../../domain/entities";
import { ChatNotificationRepositoryInterface, ChatRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { CreateChatNotifications, CreateChatNotificationsInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class CreateChatNotificationsService implements CreateChatNotifications{
    constructor(private readonly userRepository: UserRepositoryInterface,
        private readonly chatRepository: ChatRepositoryInterface, 
        private readonly chatNotificationRepository: ChatNotificationRepositoryInterface){}
    
    async create(infos: CreateChatNotificationsInterface): Promise<ChatNotification[]> {
        const existingChat = await this.chatRepository.getById(infos.chatId)
        if(!existingChat)
            throw new HttpException(HttpStatusCode.BadRequest, 'Chat not found')
        
        const createdNotifications : ChatNotification[] = []
        for(const user of existingChat.users){
            if(!user.email || infos.excludeUsersEmails.includes(user.email))
                continue
            const existingUser = await this.userRepository.getByEmail(user.email)
            if(!existingUser)
                throw new HttpException(HttpStatusCode.BadRequest, 'User not found')

            const existingNotification = await this.chatNotificationRepository.get({
                userEmail: user.email,
                chatId: infos.chatId
            })
            
            if(existingNotification){
                const notification = await this.chatNotificationRepository.addMessageToNotification({
                    userEmail: user.email,
                    chatId: infos.chatId,
                    messageId: infos.messageId
                })
                createdNotifications.push(notification)
            } else {
                const notification = await this.chatNotificationRepository.create({
                    userEmail: user.email,
                    chatId: infos.chatId,
                    messageId: infos.messageId
                })
                createdNotifications.push(notification)
            }
        }
        //console.log(createdNotifications)
        return createdNotifications
    }
}