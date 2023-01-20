import { CreateChat } from "../../../domain/usecases";
import { FileInterface } from "../../../utils/file_interface";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class CreateChatController extends Controller{
    constructor(private readonly createChatService: CreateChat){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, otherUsersEmails, isPersonal, groupName, groupImage} = httpRequest.body

        const newChat = await this.createChatService.create({
            userId, 
            otherUsersEmails,
            isPersonal,
            groupName,
            groupImage
        })

        return ok(newChat)
    }
}