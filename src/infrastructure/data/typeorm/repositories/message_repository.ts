import { Chat, Message, Video } from "../../../../domain/entities";
import { CreateMessageRepositoryInterface, EditMessageRepositoryInterface, GetChatMessagesRepositoryInterface, MessageRepositoryInterface } from "../../../../domain/repositories";
import { ChatEntity, MessageEntity, UserEntity, VideoEntity } from "../entities";

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
        id: chat.id,
        groupName: chat.groupName,
        groupImage: chat.groupImage
    }
}

function VideoMapToDomain(video: VideoEntity): Video {
    return {
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      path: video.path,
      created_by: {
        name: video.created_by.name,
        email: video.created_by.email,
        avatar: video.created_by.avatar,
        subsCount: video.created_by.subsCount,
      },
      createdAt: video.createdAt,
      description: video.description,
      viewsCount: video.viewsCount,
      likesCount: video.likesCount,
      deslikesCount: video.deslikesCount,
      commentCount: video.commentCount,
    };
  }

function MapToDomain(message: MessageEntity): Message{
    return {
        content: message.content ?? undefined,
        chat: ChatMapToDomain(message.chat),
        created_by: {
            email: message.created_by.email,
            avatar: message.created_by.avatar,
            name: message.created_by.name,
            subsCount: message.created_by.subsCount
        },
        createdAt: message.createdAt,
        id: message.id,
        fileRef: message.fileRef ?? undefined,
        videoRef: message.videoRef ? VideoMapToDomain(message.videoRef) : undefined
    }
}

export class MessageRepository implements MessageRepositoryInterface{
    async getById(id: number): Promise<Message | null> {
        const existingMessage = await MessageEntity.findOneBy({id})
        return existingMessage ? MapToDomain(existingMessage) : null 
    }
    async edit(infos: EditMessageRepositoryInterface): Promise<Message> {
        const existingMessage = await MessageEntity.findOneBy({id: infos.messageId})
        if(!existingMessage)
            throw new Error()
        existingMessage.content = infos.content
        await existingMessage.save()
        return existingMessage
    }
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
        if(infos.videoId){
            const existingVideo = await VideoEntity.findOneBy({id: infos.videoId})
            if(existingVideo) newMessage.videoRef = existingVideo
        }

        if(chat){
            chat.lastMessage = new Date()
            await chat.save()
        }    

        await newMessage.save()

        return MapToDomain(newMessage)
    }
}