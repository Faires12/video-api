import { GetVideo } from "../../../domain/usecases"
import { forbidden, ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"


export class GetVideoController extends Controller{
    constructor(private readonly getVideoService: GetVideo) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {id} = httpRequest.params
        const {userId} = httpRequest.body
        const video = await this.getVideoService.get(id, userId)

        return ok(video)
    }
    
}