import { DeleteComment } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class DeleteCommentController extends Controller{
    constructor(validation: Validation, private readonly deleteCommentService: DeleteComment) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {id} = httpRequest.params
        const {userId} = httpRequest.body
        await this.deleteCommentService.delete({id, userId})
        return ok("Comment deleted!") 
    }
    
}