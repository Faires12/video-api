import { Chat } from "../../entities";

export interface GetUserChats{
    get(userId: number) : Promise<Chat[]>
}