import { AbstractEntity } from "./abstract_entity"
import { User } from "./user"

export interface Video extends AbstractEntity{
    title: string
    thumbnail: string
    path: string
    created_by?: User
    viewsCount?: number
    likesCount?: number
    deslikesCount?: number
    commentCount?: number
    description?: string
}