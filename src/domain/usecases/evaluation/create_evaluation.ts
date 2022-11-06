import { Evaluation } from "../../entities";

export interface AddEvaluationInterface{
    created_by: number
    reference_id: number
    isVideo: boolean
    isPositive: boolean
}

export interface AddEvaluation{
    create(evaluation: AddEvaluationInterface) : Promise<Evaluation>
}