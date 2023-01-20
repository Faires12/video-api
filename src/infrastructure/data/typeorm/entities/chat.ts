import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { MessageEntity, UserEntity } from "./";
import { AbstractEntity } from "./abstract_entity";

@Entity("tb_chat")
export class ChatEntity extends AbstractEntity{
    @Column({type: "boolean", nullable: false})
    isPersonal: boolean 

    @Column({type: "varchar", nullable: true})
    groupName: string 

    @Column({type: "varchar", nullable: true})
    groupImage: string 

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    lastMessage: Date 

    @ManyToMany(() => UserEntity)
    @JoinTable({ 
        name: 'tb_chat_user',
        joinColumn: { name: 'chatId' },
        inverseJoinColumn: { name: 'userId' }
      })
    users: UserEntity[]

    @ManyToMany(() => UserEntity)
    @JoinTable({ 
        name: 'tb_chat_admin',
        joinColumn: { name: 'chatId' },
        inverseJoinColumn: { name: 'adminId' }
      })
    admins: UserEntity[]

    @OneToMany(() => MessageEntity, (message) => message.chat)
    messages: MessageEntity[]
}