import { GetEvaluation } from "../../../domain/usecases"
import {  ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"


export class GetVideoEvaluationController extends Controller{
    constructor(private readonly getEvaluationService: GetEvaluation) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId } = httpRequest.body
        const {videoId} = httpRequest.params

        const res = await this.getEvaluationService.get({
            created_by: userId,
            reference_id: videoId,
            isVideo: true
        })

        return ok(res)
    }
    
}