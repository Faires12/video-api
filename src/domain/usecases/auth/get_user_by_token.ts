import { User } from "../../entities/user";

export interface GetUserByToken{
    getByToken(token: string) : Promise<User | null>
}