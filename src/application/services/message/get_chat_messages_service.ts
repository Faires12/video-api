import { GetChatMessages, GetChatMessagesInterface } from "../../../domain/usecases";
import { ChatRepositoryInterface, MessageRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { Message } from "../../../domain/entities";
import { HttpException, HttpStatusCode } from "../../../utils/http";


export class GetChatMessagesService implements GetChatMessages{
    constructor(private readonly userRepository: UserRepositoryInterface, 
        private readonly chatRepository: ChatRepositoryInterface, 
        private readonly messageRepository: MessageRepositoryInterface
        ) {}

    async get(infos: GetChatMessagesInterface): Promise<Message[]> {
        const chat = await this.chatRepository.getById(infos.chatId)
        const user = await this.userRepository.getById(infos.userId)

        if(!chat)
            throw new HttpException(HttpStatusCode.NotFound, 'Chat not found')
        if(!user)
            throw new HttpException(HttpStatusCode.NotFound, 'Chat not found')
        
        let foundUser = false
        for(const chatUser of chat.users){
            if(chatUser.email === user.email){
                foundUser = true
                break
            }
        }

        if(!foundUser)
            throw new HttpException(HttpStatusCode.NotFound, 'User not in chat')

        return await this.messageRepository.getChatMessages({
            chatId: infos.chatId,
            page: infos.page,
            rows: infos.rows
        })
    }
}