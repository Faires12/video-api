import { User } from "./user"

export interface Comment{
    id?: number
    content: string
    created_by: User
    createdAt?: Date
    video_id?: number
    comment_id?: number
    likesCount?: number
    deslikesCount?: number
    responses?: Comment[]
}