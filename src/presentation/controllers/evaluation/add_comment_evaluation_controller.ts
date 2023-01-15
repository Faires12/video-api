import { AddEvaluation } from "../../../domain/usecases"
import { forbidden, ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"

export class AddCommentEvaluationController extends Controller{
    constructor(private readonly addEvaluationService : AddEvaluation) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, commentId, isPositive} = httpRequest.body

        const res = await this.addEvaluationService.create({
            created_by: userId,
            reference_id: commentId,
            isLike: isPositive,
            isVideo: false
        })

        return ok(res)
    }
    
}