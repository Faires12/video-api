import { GetChatMessages } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class GetChatMessagesController extends Controller{
    constructor(private readonly getChatMessagesService: GetChatMessages){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const {chatId} = httpRequest.params
        const {page, rows} = httpRequest.query

        const messages = await this.getChatMessagesService.get({
            userId, 
            chatId,
            page,
            rows
        })

        return ok(messages)
    }
}