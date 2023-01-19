import { CreateMessage } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class CreateMessageController extends Controller{
    constructor(private readonly createMessageService: CreateMessage){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, chatId, content, file} = httpRequest.body

        const newMessage = await this.createMessageService.create({
            userId, 
            chatId,
            content,
            file
        })

        return ok(newMessage)
    }
}