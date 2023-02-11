import { Chat, ChatNotification, Message } from "../../../../domain/entities";
import { AddMessageToNotificationRepositoryInterface, ChatNotificationRepositoryInterface, CreateChatNotificationRepositoryInterface, GetChatNotificationRepositoryInterface } from "../../../../domain/repositories";
import { ChatEntity, ChatNotificationEntity, MessageEntity, UserEntity } from "../entities";

function MessageMapToDomain(message: MessageEntity): Message{
    return {
        content: message.content,
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

function ChatMapToDomain(chat: ChatEntity) : Chat {
    return {
        isPersonal: chat.isPersonal,
        users: [],
        messages: [],
        id: chat.id,
        groupName: chat.groupName,
        groupImage: chat.groupImage
    }
}

function MapToDomain(chatNotification: ChatNotificationEntity): ChatNotification{
    return {
        id: chatNotification.id,
        chat: ChatMapToDomain(chatNotification.chat),
        read: chatNotification.read,
        reciever: chatNotification.reciever.email,
        messages: chatNotification.messages.map(message => MessageMapToDomain(message))
    }
}

export class ChatNotificationRepository implements ChatNotificationRepositoryInterface{
    async clear(id: number): Promise<void> {
        const existingNotification = await ChatNotificationEntity.findOne({
            where: {id: id, read: false},
            relations: ["messages"]
        })

        if(existingNotification){
            existingNotification.read = true
            await existingNotification.save()
        }
    }
    async getById(id: number): Promise<ChatNotification | null> {
        const existingNotification = await ChatNotificationEntity.findOne({
            where: {id: id, read: false},
            relations: ["messages"]
        })

        return existingNotification ? MapToDomain(existingNotification) : null
    }
    async getAllUserNotifications(userId: number): Promise<ChatNotification[]> {
        const notifications = await ChatNotificationEntity.find({
            where: {userId: userId, read: false},
            relations: ["messages"]
        })
        
        return notifications.map(notification => MapToDomain(notification))
    }

    async get(infos: GetChatNotificationRepositoryInterface): Promise<ChatNotification | null> {
        const user = await UserEntity.findOneBy({email: infos.userEmail})
        if(!user)
            throw new Error()

        const existingNotification = await ChatNotificationEntity.findOne({
            where: {
                userId: user.id,
                read: false,
                chatId: infos.chatId
            },
            relations: ['messages']
        })

        return existingNotification ? MapToDomain(existingNotification) : null
    }
    async addMessageToNotification(infos: AddMessageToNotificationRepositoryInterface): Promise<ChatNotification> {
        const user = await UserEntity.findOneBy({email: infos.userEmail})
        if(!user)
            throw new Error()

        const existingNotification = await ChatNotificationEntity.findOne({
            where: {
                userId: user.id,
                read: false,
                chatId: infos.chatId
            },
            relations: ['messages']
        })

        if(!existingNotification)
            throw new Error()

        const message = await MessageEntity.findOneBy({id: infos.messageId})
        message && existingNotification.messages.push(message)
        await existingNotification.save()
        return MapToDomain(existingNotification)
    }
    async create(infos: CreateChatNotificationRepositoryInterface): Promise<ChatNotification> {
        const user = await UserEntity.findOneBy({email: infos.userEmail})
        const chat = await ChatEntity.findOneBy({id: infos.chatId})
        if(!user || !chat)
            throw new Error()

        const message = await MessageEntity.findOneBy({id: infos.messageId})

        const newNotification = new ChatNotificationEntity()
        newNotification.reciever = user
        newNotification.userId = user.id
        newNotification.chat = chat
        newNotification.messages = []
        message && newNotification.messages.push(message)
        await newNotification.save()
        return MapToDomain(newNotification)
    }
}