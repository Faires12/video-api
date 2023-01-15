import { EditComment } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class EditCommentController extends Controller{
    constructor(private readonly editCommentService: EditComment) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, id, content} = httpRequest.body
        const comment = await this.editCommentService.edit({id, userId, content})
        return ok(comment) 
    }
    
}