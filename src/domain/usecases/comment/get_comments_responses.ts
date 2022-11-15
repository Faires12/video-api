import { Comment } from "../../entities"
import { CommentDTO } from "./get_video_comments"

export interface GetCommentResponsesInterface{
    commentId: number
    page: number
    rows: number
    userId?: number
}

export interface GetCommentResponses{
    get(infos: GetCommentResponsesInterface) : Promise<CommentDTO[]>
}