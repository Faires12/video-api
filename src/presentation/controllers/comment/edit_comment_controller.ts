import { EditComment } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class EditCommentController extends Controller{
    constructor(validation: Validation, private readonly editCommentService: EditComment) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, id, content} = httpRequest.body
        const comment = await this.editCommentService.edit({id, userId, content})
        return ok(comment) 
    }
    
}