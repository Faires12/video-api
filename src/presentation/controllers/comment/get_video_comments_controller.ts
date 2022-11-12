import { GetVideoComments } from "../../../domain/usecases"
import { forbidden, ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"

export class GetVideoCommentsController extends Controller{
    constructor(validation: Validation, private readonly getVideoCommentsService: GetVideoComments) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {page, rows} = httpRequest.query
        const {videoId} = httpRequest.params
        const {userId} = httpRequest.body
        const comments = await this.getVideoCommentsService.get({videoId, page, rows, userId})
        return ok(comments)
    }
    
}