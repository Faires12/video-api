import { GetEvaluation } from "../../../domain/usecases"
import {  ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"


export class GetCommentEvaluationController extends Controller{
    constructor(validation : Validation, private readonly getEvaluationService: GetEvaluation) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const {commentId} = httpRequest.params

        const res = await this.getEvaluationService.get({
            created_by: userId,
            reference_id: commentId,
            isVideo: false
        })

        return ok(res)
    }
    
}