import { FileInterface, User } from "../../entities";

export interface RegisterInterface {
    email: string
    name: string
    password: string
    avatarFile?: FileInterface
}

export interface Register {
    register(new_user: RegisterInterface) : Promise<User | null>
}