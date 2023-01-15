import { SearchVideos } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class SearchVideosController extends Controller{
    constructor(private readonly searchVideosService: SearchVideos) {super()}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, search} = httpRequest.body
        const {rows, page, orderBy} = httpRequest.query

        const videos = await this.searchVideosService.search({userId, rows, page, orderBy, search})
        return ok(videos)
    }
    
}