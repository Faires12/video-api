import { AbstractEntity } from "./abstract_entity"
import { User } from "./user"

export interface Comment extends AbstractEntity{
    content: string
    created_by: User
    video_id?: number
    comment_id?: number
    likesCount?: number
    deslikesCount?: number
    responses?: Comment[]
    commentCount?: number
}

