import { Comment } from "../../entities"

export interface GetCommentResponsesInterface{
    commentId: number
    page: number
    rows: number
    userId?: number
}

export interface GetCommentResponses{
    get(infos: GetCommentResponsesInterface) : Promise<Comment[]>
}