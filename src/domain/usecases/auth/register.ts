import { FileInterface } from "../../../utils/file_interface"
import { User } from "../../entities"

export interface RegisterInterface {
    email: string
    name: string
    password: string
    avatarFile?: FileInterface
}

export interface Register {
    register(new_user: RegisterInterface) : Promise<User>
}