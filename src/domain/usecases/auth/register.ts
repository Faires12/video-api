import { FileInterface } from "../../../application/interfaces/file_interface";
import { User } from "../../entities/user";

export interface RegisterInterface {
    email: string
    name: string
    password: string
    avatarFile?: FileInterface
}

export interface Register {
    register(new_user: RegisterInterface) : Promise<User | null>
}