import { User } from "../../entities";

export interface GetUserDataByEmail{
    get(email: string): Promise<User>
}