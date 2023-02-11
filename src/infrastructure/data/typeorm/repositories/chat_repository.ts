import { In } from "typeorm";
import { Chat } from "../../../../domain/entities";
import { ChatRepositoryInterface, CreateChatRepositoryInterface, GetPersonalChatInterface } from "../../../../domain/repositories";
import { ChatEntity, UserEntity } from "../entities";

function MapToDomain(chat: ChatEntity) : Chat {
    return {
        isPersonal: chat.isPersonal,
        users: chat.users.map(user => {
            return {
                email: user.email,
                avatar: user.avatar,
                name: user.name,
                subsCount: user.subsCount
            }
        }),
        messages: [],
        id: chat.id,
        groupName: chat.groupName,
        groupImage: chat.groupImage
    }
}

export class ChatRepository implements ChatRepositoryInterface{
    async getById(id: number): Promise<Chat | null> {
        const chat = await ChatEntity.findOne({
            relations: ["users"],
            where: {id}
        })

        return chat ? MapToDomain(chat) : null
    }

    async getUserChats(userId: number): Promise<Chat[]> {
        let allUserChats = await ChatEntity.find({
            relations: ["users"],
            order: {lastMessage: "DESC"}
        })
        const chats = allUserChats.filter(chat => {
            const user = chat.users.find(user => user.id === userId)
            if(user)
                return true
            return false
        })
        return chats.map(chat => MapToDomain(chat))
    }

    async getPersonalChat(infos: GetPersonalChatInterface): Promise<Chat | null> {
        let allUserChats = await ChatEntity.find({
            relations: ["users"]
        })
        const chat = allUserChats.find(chat => {
            const actualUser = chat.users.find(user => user.id === infos.actualUser)
            const otherUser = chat.users.find(user => user.id === infos.otherUser.id)
            if(actualUser && otherUser && chat.isPersonal)
                return true
            return false
        })
        return chat ? MapToDomain(chat) : null
    }
    
    async create(infos: CreateChatRepositoryInterface): Promise<Chat> {
        const chatEntity = new ChatEntity()
        const user = await UserEntity.findOneBy({id: infos.created_by})

        chatEntity.users = []
        user && chatEntity.users.push(user)
        for(const otherUser of infos.otherUsers){
            const user = await UserEntity.findOneBy({id: otherUser.id})
            user && chatEntity.users.push(user)
        }

        chatEntity.isPersonal = infos.isPersonal
        if(infos.groupName && !infos.isPersonal)
            chatEntity.groupName = infos.groupName
        if(infos.groupImage && !infos.isPersonal)
            chatEntity.groupImage = infos.groupImage

        await chatEntity.save()
        return MapToDomain(chatEntity)
    }
    
}