import { User } from "../../entities";

export interface GetLoggedUserData{
    get(id: number): Promise<User>
}