import { AddView } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class AddViewController extends Controller{
    constructor(private readonly AddViewService: AddView){super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { videoId } = httpRequest.body
        await this.AddViewService.add(videoId)
        return ok("View added successfully")
    }
}