import { User } from "./user"

export interface Video{
    id?: number
    title: string
    thumbnail: string
    path: string
    created_by?: User
    viewsCount?: number
    likesCount?: number
    deslikesCount?: number
    createdAt?: Date
    description?: string
}