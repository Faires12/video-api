import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ChatEntity, UserEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_message")
export class MessageEntity extends AbstractEntity{
    @ManyToOne(() => UserEntity, (user) => user.messages, {eager: true})
    @JoinColumn({name: 'user_id'})
    created_by: UserEntity

    @Column({type: 'int', name: 'user_id', nullable: false})
    userId: number

    @Column({type: "varchar", nullable: false})
    content: string 

    @ManyToOne(() => ChatEntity, (chat) => chat.messages)
    @JoinColumn({name: 'chat_id'})
    chat: ChatEntity

    @Column({type: 'int', name: 'chat_id', nullable: false})
    chatId: number
}