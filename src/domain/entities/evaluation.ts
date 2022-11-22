import { AbstractEntity } from "./abstract_entity"

export interface Evaluation extends AbstractEntity{
    created_by: number  
    isPositive: boolean
    videoId?: number
    commentId?: number
}
