import { GetVideo } from "../../../domain/usecases"
import { forbidden, ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations"


export class GetVideoController extends Controller{
    constructor(validation: Validation, private readonly getVideoService: GetVideo) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {id} = httpRequest.params

        const video = await this.getVideoService.get(id)

        return ok(video)
    }
    
}