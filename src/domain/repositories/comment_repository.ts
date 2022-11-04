import { Comment } from "../entities/comment"

export interface CreateCommentInterface{
    created_by: number,
    content: string,
    video_id?: number,
    comment_id?: number
}

export interface GetVideoCommentsInterface{
    videoId: number, 
    page: number, 
    rows: number
}

export interface CommentRepositoryInterface{
    create(comment: CreateCommentInterface) : Promise<Comment>
    update(comment: Comment) : Promise<Comment>
    getAll() : Promise<Comment[]>
    getById(id: number) : Promise<Comment | null>
    delete(id: number) : Promise<Comment>
    changeEvaluations(id: number, isLike: boolean, isPositive: boolean, isChange?: boolean) : Promise<void>
    getByVideo(infos: GetVideoCommentsInterface) : Promise<Comment[]>
}