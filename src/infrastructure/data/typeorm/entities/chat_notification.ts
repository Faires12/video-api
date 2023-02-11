import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ChatEntity, MessageEntity, UserEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_chat_notification")
export class ChatNotificationEntity extends AbstractEntity{
    @ManyToOne(() => UserEntity, (user) => user.chatNotifications, {eager: true})
    @JoinColumn({name: 'user_id'})
    reciever: UserEntity

    @Column({type: 'int', name: 'user_id', nullable: false})
    userId: number

    @ManyToMany(() => MessageEntity)
    @JoinTable({ 
        name: 'tb_notification_message',
        joinColumn: { name: 'notificationId' },
        inverseJoinColumn: { name: 'messageId' }
      })
    messages: MessageEntity[]

    @ManyToOne(() => ChatEntity, (chat) => chat.chatNotifications, {eager: true})
    @JoinColumn({name: 'chat_id'})
    chat: ChatEntity

    @Column({type: 'int', name: 'chat_id', nullable: false})
    chatId: number

    @Column({type: 'bool', default: false})
    read: boolean
}