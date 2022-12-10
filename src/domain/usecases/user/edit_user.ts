import { FileInterface } from "../../../utils/file_interface"
import { Comment, User } from "../../entities"

export interface EditUserInterface{
    avatar?: FileInterface
    name?: string
    userId: number
}

export interface EditUser{
    edit(infos: EditUserInterface): Promise<User>
}