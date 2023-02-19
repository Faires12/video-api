import { EditMessage } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class EditMessageController extends Controller{
    constructor(private readonly editMessageService: EditMessage){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, messageId, content} = httpRequest.body
        const message = await this.editMessageService.edit({userId, messageId, content})
        return ok(message)
    }
    
}