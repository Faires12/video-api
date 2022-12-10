import { DeleteVideo } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class DeleteVideoController extends Controller{
    constructor(validation: Validation, private readonly deleteVideoService: DeleteVideo) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {id} = httpRequest.params
        const {userId} = httpRequest.body
        await this.deleteVideoService.delete({id, userId})
        return ok("Video deleted!") 
    }
    
}