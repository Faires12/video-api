import { Chat, Message } from "../../../../domain/entities";
import { CreateMessageRepositoryInterface, GetChatMessagesRepositoryInterface, MessageRepositoryInterface } from "../../../../domain/repositories";
import { ChatEntity, MessageEntity, UserEntity } from "../entities";

function ChatMapToDomain(chat: ChatEntity) : Chat {
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
        id: chat.id
    }
}

function MapToDomain(message: MessageEntity): Message{
    return {
        content: message.content,
        chat: ChatMapToDomain(message.chat),
        created_by: {
            email: message.created_by.email,
            avatar: message.created_by.avatar,
            name: message.created_by.name,
            subsCount: message.created_by.subsCount
        },
        createdAt: message.createdAt,
        id: message.id,
        fileRef: message.fileRef
    }
}

export class MessageRepository implements MessageRepositoryInterface{
    async getChatMessages(infos: GetChatMessagesRepositoryInterface): Promise<Message[]> {
        const messages = await MessageEntity.find({
            where: {chatId: infos.chatId},
            take: infos.rows,
            skip: Math.floor((infos.page - 1) * infos.rows),
            order: {createdAt: "DESC"}
        })
        const chat = await ChatEntity.findOne({
            relations: ["users"],
            where: {id: infos.chatId}
        })            

        return messages.map(message => {
            if(chat)
                message.chat = chat
            return MapToDomain(message)
        })
    }

    async create(infos: CreateMessageRepositoryInterface): Promise<Message> {
        const newMessage = new MessageEntity()
        const user = await UserEntity.findOneBy({id: infos.user})
        const chat = await ChatEntity.findOne({
            relations: ["users"],
            where: {id: infos.chat}
        })

        newMessage.chatId = infos.chat
        newMessage.userId = infos.user
        newMessage.content = infos.content
        if(user)
            newMessage.created_by = user
        if(chat)
            newMessage.chat = chat
        if(infos.fileRef)
            newMessage.fileRef = infos.fileRef

        await newMessage.save()

        return MapToDomain(newMessage)
    }
}