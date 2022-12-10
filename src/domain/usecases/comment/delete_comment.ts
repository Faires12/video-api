export interface DeleteCommentInterface{
    id: number
    userId: number
}

export interface DeleteComment{
    delete(infos: DeleteCommentInterface) : Promise<void>
}