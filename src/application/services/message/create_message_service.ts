import { Message } from "../../../domain/entities";
import { ChatRepositoryInterface, MessageRepositoryInterface, UserRepositoryInterface, VideoRepositoryInterface } from "../../../domain/repositories";
import { CreateMessage, CreateMessageInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";
import { SaveFileObject, UuidGenerator } from "../../interfaces";

export class CreateMessageService implements CreateMessage{
    constructor(private readonly userRepository: UserRepositoryInterface, 
        private readonly chatRepository: ChatRepositoryInterface, 
        private readonly messageRepository: MessageRepositoryInterface,
        private readonly videoRepository: VideoRepositoryInterface,
        private readonly saveFileObject: SaveFileObject,
        private readonly uuidGenerator: UuidGenerator
        ) {}
    
    async create(infos: CreateMessageInterface): Promise<Message> { 
        if(!infos.content && !infos.file && !infos.videoId)
            throw new HttpException(HttpStatusCode.BadRequest, 'Need to send a string content or a file or a video reference')

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

        let fileRef : string | undefined = undefined
        if(infos.file)
            fileRef = await this.saveFileObject.saveBase64(infos.file, this.uuidGenerator.generate())

        if(infos.videoId && !await this.videoRepository.getById(infos.videoId))
            throw new HttpException(HttpStatusCode.NotFound, 'video not found')
        

        return await this.messageRepository.create({
            chat: infos.chatId,
            user: infos.userId,
            content: infos.content,
            fileRef: fileRef,
            videoId: infos.videoId
        })
    }

}