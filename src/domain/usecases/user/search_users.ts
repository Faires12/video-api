import { User } from "../../entities"

export interface SearchUsersInterface{
    userId: number
    search: string
    page: number
    rows: number
}

export interface SearchUsers{
    search(infos: SearchUsersInterface): Promise<User[]>
}