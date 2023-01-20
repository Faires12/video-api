import { Chat, User } from "../../../domain/entities";
import { ChatRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { CreateChat, CreateChatInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { SaveFileObject, UuidGenerator } from "../../interfaces";

export class CreateChatService implements CreateChat{
    constructor(private readonly userRepository: UserRepositoryInterface, 
        private readonly chatRepository: ChatRepositoryInterface,
        private readonly saveFileObject: SaveFileObject,
        private readonly uuidGenerator: UuidGenerator
        ) {}
    
    async create(infos: CreateChatInterface): Promise<Chat> {
        if(infos.isPersonal && infos.otherUsersEmails.length !== 1)
            throw new HttpException(HttpStatusCode.NotFound, 'Personal chat can only have 1 other user')
        if(!infos.isPersonal && infos.otherUsersEmails.length < 2)
            throw new HttpException(HttpStatusCode.NotFound, 'Group chats need to be at least 3 users')
        if(!infos.isPersonal && !infos.groupName)
            throw new HttpException(HttpStatusCode.NotFound, 'Group chats need to have groupName')
        if(!infos.isPersonal && !infos.groupImage)
            throw new HttpException(HttpStatusCode.NotFound, 'Group chats need to have groupImage')
            
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
            if(existingChat) 
                throw new HttpException(HttpStatusCode.NotFound, 'Personal chat already exists')
        }

        let groupImage : string | undefined = undefined
        if(!infos.isPersonal && infos.groupImage)
            groupImage = await this.saveFileObject.saveBase64(infos.groupImage, this.uuidGenerator.generate())

        return await this.chatRepository.create({
            created_by: infos.userId,
            otherUsers: otherUsers,
            isPersonal: infos.isPersonal,
            groupName: infos.groupName,
            groupImage: groupImage
        })
    }
}