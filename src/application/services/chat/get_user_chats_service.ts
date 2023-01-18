import { Chat } from "../../../domain/entities";
import { ChatRepositoryInterface } from "../../../domain/repositories";
import { GetUserChats } from "../../../domain/usecases";

export class GetUserChatsService implements GetUserChats{
    constructor(private readonly chatRepository: ChatRepositoryInterface) {}
    
    async get(userId: number): Promise<Chat[]> {
        return await this.chatRepository.getUserChats(userId)
    } 
}