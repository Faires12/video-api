import { Comment } from "../../entities"

export interface EditCommentInterface{
    content: string
    userId: number
    id: number
}

export interface EditComment{
    edit(infos: EditCommentInterface): Promise<Comment>
}