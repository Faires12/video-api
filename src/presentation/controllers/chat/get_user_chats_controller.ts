import { GetUserChats } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class GetUserChatsController extends Controller{
    constructor(private readonly getUserChatsService: GetUserChats){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body

        const chats = await this.getUserChatsService.get(userId)
        
        return ok(chats)
    }
}