import { Chat, User } from "../../../domain/entities";
import { ChatRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { CreateChat, CreateChatInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class CreateChatService implements CreateChat{
    constructor(private readonly userRepository: UserRepositoryInterface, private readonly chatRepository: ChatRepositoryInterface) {}
    
    async create(infos: CreateChatInterface): Promise<Chat> {
        if(infos.otherUsersEmails.length < 1)
            throw new HttpException(HttpStatusCode.NotFound, 'Chat need to have more than 1 user')
        if(infos.isPersonal && infos.otherUsersEmails.length !== 1)
            throw new HttpException(HttpStatusCode.NotFound, 'Personal chat can only have 1 other user')
            
        const otherUsers : User[] = []
        for(const userEmail of infos.otherUsersEmails){
            const user = await this.userRepository.getByEmail(userEmail)
            if(!user)
                throw new HttpException(HttpStatusCode.NotFound, 'User not found')
            if(user.id === infos.userId)
                throw new HttpException(HttpStatusCode.NotFound, 'Cannot open a chat with yourself')
            otherUsers.push(user)
        }

        if(infos.isPersonal){
            const existingChat = await this.chatRepository.getPersonalChat({actualUser: infos.userId, otherUser: otherUsers[0]})
            if(existingChat) return existingChat
        }

        return await this.chatRepository.create({
            created_by: infos.userId,
            otherUsers: otherUsers,
            isPersonal: infos.isPersonal,
            groupName: infos.groupName
        })
    }
}