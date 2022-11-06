import { Evaluation } from "../../../../domain/entities"
import { CreateEvaluationInterface, EvaluationRepositoryInterface, UpdateEvaluationInterface } from "../../../../domain/repositories"
import { EvaluationEntity } from "../entities"

export class EvaluationRepository implements EvaluationRepositoryInterface{
    async create(evaluation: CreateEvaluationInterface): Promise<Evaluation> {
        const newEvaluation = new EvaluationEntity()
        newEvaluation.userId = evaluation.created_by
        newEvaluation.isPositive = evaluation.isPositive
        if(evaluation.videoId)
            newEvaluation.videoId = evaluation.videoId
        if(evaluation.commentId)
            newEvaluation.commentId = evaluation.commentId
        await newEvaluation.save()
        return {
            created_by: newEvaluation.userId,
            isPositive: newEvaluation.isPositive,
            id: newEvaluation.id,
            videoId: newEvaluation.videoId,
            commentId: newEvaluation.commentId,
        }
    }
    async update(evaluation: UpdateEvaluationInterface): Promise<Evaluation> {
        const existingEvaluation = await EvaluationEntity.findOneBy({id: evaluation.id})
        if(!existingEvaluation)
            throw new Error("Evaluation not found.");
        existingEvaluation.isPositive = evaluation.isPositive
        await existingEvaluation.save()
        return {
            created_by: existingEvaluation.userId,
            isPositive: existingEvaluation.isPositive,
            id: existingEvaluation.id,
            videoId: existingEvaluation.videoId,
            commentId: existingEvaluation.commentId,
        }
    }
    async delete(id: number): Promise<Evaluation> {
        const existingEvaluation = await EvaluationEntity.findOneBy({id})
        if(!existingEvaluation)
            throw new Error("Evaluation not found.");
        await EvaluationEntity.remove(existingEvaluation)
        return {
            created_by: existingEvaluation.userId,
            isPositive: existingEvaluation.isPositive,
            id: existingEvaluation.id,
            videoId: existingEvaluation.videoId,
            commentId: existingEvaluation.commentId,
        }
    }
    async getByVideo(videoId: number, userId: number): Promise<Evaluation | null> {
        const existingEvaluation = await EvaluationEntity.findOneBy({userId, videoId})
        return existingEvaluation ? {
            created_by: existingEvaluation.userId,
            isPositive: existingEvaluation.isPositive,
            id: existingEvaluation.id,
            videoId: existingEvaluation.videoId,
            commentId: existingEvaluation.commentId,
        } : null
    }
    async getByComment(commentId: number, userId: number): Promise<Evaluation | null> {
        const existingEvaluation = await EvaluationEntity.findOneBy({userId, commentId})
        return existingEvaluation ? {
            created_by: existingEvaluation.userId,
            isPositive: existingEvaluation.isPositive,
            id: existingEvaluation.id,
            videoId: existingEvaluation.videoId,
            commentId: existingEvaluation.commentId,
        } : null
    }

}