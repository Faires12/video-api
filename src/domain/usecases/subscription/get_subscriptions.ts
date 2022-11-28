import { User } from "../../entities";

export interface GetSubscriptions{
    get(userId: number) : Promise<User[]>
}