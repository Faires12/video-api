import { GetUserVideos } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetUserVideosController extends Controller{
    constructor(private readonly getUserVideosService: GetUserVideos) {super()}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {email} = httpRequest.params
        const {rows, page, orderBy} = httpRequest.query

        const videos = await this.getUserVideosService.get({email, rows, page, orderBy})
        return ok(videos)
    }
    
}