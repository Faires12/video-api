import { User } from "../../entities";

export interface GetUserByToken{
    getByToken(token: string) : Promise<User>
}