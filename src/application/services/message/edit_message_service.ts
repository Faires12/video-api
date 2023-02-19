import { Message } from "../../../domain/entities";
import { MessageRepositoryInterface, UserRepositoryInterface } from "../../../domain/repositories";
import { EditMessage, EditMessageInterface } from "../../../domain/usecases";
import { HttpException, HttpStatusCode } from "../../../utils/http";

export class EditMessageService implements EditMessage{
    constructor(private readonly userRepository: UserRepositoryInterface,
        private readonly messageRepository: MessageRepositoryInterface){}

    async edit(infos: EditMessageInterface): Promise<Message> {
        const user = await this.userRepository.getById(infos.userId)
        const message = await this.messageRepository.getById(infos.messageId)

        if(!user)
            throw new HttpException(HttpStatusCode.NotFound, 'User not found')
        if(!message)
            throw new HttpException(HttpStatusCode.NotFound, 'Message not found')
        if(user.email !== message.created_by.email)
            throw new HttpException(HttpStatusCode.Forbidden, 'Message not owned by the user')
        
        return await this.messageRepository.edit({content: infos.content, messageId: infos.messageId})
    }
    
}