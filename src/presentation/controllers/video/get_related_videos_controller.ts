import { GetRelatedVideos } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetRelatedVideosController extends Controller{
    constructor(validation: Validation, private readonly getRelatedVideosService: GetRelatedVideos) {super(validation)}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {email} = httpRequest.params
        const {rows, page} = httpRequest.query

        const videos = await this.getRelatedVideosService.get({otherUserEmail: email, rows, page})
        return ok(videos)
    }
    
}