import { CreateChatNotifications } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class CreateChatNotificationsController extends Controller{
    constructor(private readonly createChatNotificationsService: CreateChatNotifications){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {chatId, messageId, excludeUsersEmails} = httpRequest.body
        const chatNotifications = await this.createChatNotificationsService.create({
            chatId: chatId,
            messageId: messageId,
            excludeUsersEmails: excludeUsersEmails
        })
        return ok(chatNotifications)
    }
    
}