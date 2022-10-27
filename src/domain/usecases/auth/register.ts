import { User } from "../../entities/user";

export interface RegisterInterface {
    email: string
    name: string
    password: string
}

export interface Register {
    register(new_user: RegisterInterface) : Promise<User | null>
}