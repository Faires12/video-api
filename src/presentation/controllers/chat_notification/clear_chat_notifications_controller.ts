import { ClearChatNotifications } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class ClearChatNotificationsController extends Controller{
    constructor(private readonly clearChatNotificationsService: ClearChatNotifications){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, chatNotificationsIds} = httpRequest.body
        await this.clearChatNotificationsService.clear({
            userId,
            chatNotificationsIds
        })
        return ok("Chat notifications successfully cleared!")
    }
    
}