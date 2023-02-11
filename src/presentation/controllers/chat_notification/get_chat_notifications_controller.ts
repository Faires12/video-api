import { GetChatNotifications } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class GetChatNotificationsController extends Controller{
    constructor(private readonly getChatNotificationService: GetChatNotifications){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const chatNotifications = await this.getChatNotificationService.get(userId)
        return ok(chatNotifications)
    }
    
}