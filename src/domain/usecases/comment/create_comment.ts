import { Comment } from "../../entities/comment";

export interface CreateCommentInterface{
    userId: number
    content: string
    referenceId: number
    isVideo: boolean
}

export interface CreateComment{
    create(comment: CreateCommentInterface) : Promise<Comment | null>
}