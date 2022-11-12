export interface GetEvaluationInterface{
    created_by: number
    reference_id: number
    isVideo: boolean
}

export interface GetEvaluation{
    get(evaluation: GetEvaluationInterface) : Promise<boolean | null>
}