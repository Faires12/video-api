import { AddEvaluation, AddVideoToHistoric } from "../../../domain/usecases"
import { forbidden, ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"

export class AddVideoToHistoricController extends Controller{
    constructor(private readonly addVideoToHistoricService: AddVideoToHistoric) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, videoId, watchedTime} = httpRequest.body

        await this.addVideoToHistoricService.add({
            userId: userId,
            videoId: videoId,
            watchedTime: watchedTime
        })

        return ok("Video added successfully")
    }
    
}