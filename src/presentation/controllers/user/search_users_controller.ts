import { SearchUsers } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";

export class SearchUsersController extends Controller{
    constructor(private readonly searchUsersService: SearchUsers) {super()}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, search} = httpRequest.body
        const {page, rows} = httpRequest.query

        const users = await this.searchUsersService.search({
            userId,
            search,
            page,
            rows
        })

        return ok(users)
    }
}