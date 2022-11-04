import { Evaluation } from "../entities"

export interface CreateEvaluationInterface{
    created_by: number,
    isPositive: boolean
    videoId?: number
    commentId?: number
}

export interface UpdateEvaluationInterface{
    id: number
    isPositive: boolean
}


export interface EvaluationRepositoryInterface{
    create(evaluation: CreateEvaluationInterface) : Promise<Evaluation>
    update(evaluation: UpdateEvaluationInterface) : Promise<Evaluation>
    getAll() : Promise<Evaluation[]>
    getById(id: number) : Promise<Evaluation | null>
    delete(id: number) : Promise<Evaluation>
    getByVideo(videoId: number, userId: number) : Promise<Evaluation | null>
    getByComment(commentId: number, userId: number) : Promise<Evaluation | null>
}