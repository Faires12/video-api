import { GetHomeVideos } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetHomeVideosController extends Controller{
    constructor(validation: Validation, private readonly getHomeVideosSerivice: GetHomeVideos) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {page, rows} = httpRequest.query
        const {userId} = httpRequest.body
        const videos = await this.getHomeVideosSerivice.get({page, rows, userId})
        return ok(videos) 
    }
    
}