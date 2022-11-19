import { GetUserPlaylists } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetUserPlaylistsController extends Controller{
    constructor(validation: Validation, private readonly getUserPlaylistsService: GetUserPlaylists) {super(validation)}
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const playlists = await this.getUserPlaylistsService.get(userId)
        return ok(playlists)
    }
    
}