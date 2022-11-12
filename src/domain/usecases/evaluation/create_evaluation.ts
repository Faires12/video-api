import { Comment, Video } from "../../entities"

export interface AddEvaluationInterface{
    created_by: number
    reference_id: number
    isVideo: boolean
    isLike: boolean
}

export interface AddEvaluation{
    create(evaluation: AddEvaluationInterface) : Promise<Video | Comment | null>
}