import { GetSubscriptions, GetSubscriptionsVideos } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetSubscriptionsVideosController extends Controller{
    constructor(validation: Validation, private readonly getSubscriptionsVideosService: GetSubscriptionsVideos) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const {page, rows} = httpRequest.query
        const videos = await this.getSubscriptionsVideosService.get({
            userId,
            page,
            rows
        })
        return ok(videos)
    }
    
}