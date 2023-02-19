import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ChatEntity, UserEntity, VideoEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_message")
export class MessageEntity extends AbstractEntity{
    @ManyToOne(() => UserEntity, (user) => user.messages, {eager: true})
    @JoinColumn({name: 'user_id'})
    created_by: UserEntity

    @Column({type: 'int', name: 'user_id', nullable: false})
    userId: number

    @Column({type: "varchar", nullable: true})
    content: string 

    @Column({type: "varchar", nullable: true})
    fileRef: string 

    @ManyToOne(() => ChatEntity, (chat) => chat.messages)
    @JoinColumn({name: 'chat_id'})
    chat: ChatEntity

    @Column({type: 'int', name: 'chat_id', nullable: false})
    chatId: number

    @ManyToOne(() => VideoEntity, (video) => video.messageRefs, {eager: true})
    @JoinColumn({name: 'video_id'})
    videoRef: VideoEntity

    @Column({type: 'int', name: 'video_id', nullable: true})
    videoId: number
}