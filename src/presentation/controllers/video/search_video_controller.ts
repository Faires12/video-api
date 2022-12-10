import { SearchVideos } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class SearchVideosController extends Controller{
    constructor(validation: Validation, private readonly searchVideosService: SearchVideos) {super(validation)}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, search} = httpRequest.body
        const {rows, page, orderBy} = httpRequest.query

        const videos = await this.searchVideosService.search({userId, rows, page, orderBy, search})
        return ok(videos)
    }
    
}