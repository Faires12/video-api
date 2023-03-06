import { GetHistoric } from "../../../domain/usecases"
import { ok } from "../../helpers/http"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"

export class GetHistoricController extends Controller{
    constructor(private readonly getHistoricService: GetHistoric) {super()}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const {page, rows} = httpRequest.query

        const historics = await this.getHistoricService.get({
            userId: userId,
            page: page,
            rows: rows
        })

        return ok(historics)
    }
}