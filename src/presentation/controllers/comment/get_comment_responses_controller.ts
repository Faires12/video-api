import { GetCommentResponses, GetVideoComments } from "../../../domain/usecases"
import { ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"

export class GetCommentResponsesController extends Controller{
    constructor(private readonly getCommentResponsesService: GetCommentResponses) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {page, rows} = httpRequest.query
        const {commentId} = httpRequest.params
        const {userId} = httpRequest.body
        const comments = await this.getCommentResponsesService.get({commentId, page, rows, userId})
        return ok(comments)
    }
    
}