import { AbstractEntity } from "./abstract_entity";
import { Message, User } from "./";

export interface Chat extends AbstractEntity{
    messages: Message[]
    users: User[]
    isPersonal: boolean
    groupName?: string
    admins?: User[]
}