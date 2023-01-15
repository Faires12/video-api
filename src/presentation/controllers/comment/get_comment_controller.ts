import { GetComment, GetVideoComments } from "../../../domain/usecases"
import { ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"

export class GetCommentController extends Controller{
    constructor(private readonly getCommentService: GetComment) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {commentId} = httpRequest.params
        const {userId} = httpRequest.body
        const comment = await this.getCommentService.get(commentId, userId)
        return ok(comment)
    }
    
}