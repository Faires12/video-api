import { GetPlaylist, GetUserPlaylists } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class GetPlaylistByIdController extends Controller{
    constructor(private readonly getPlaylistByIdService: GetPlaylist) {super()}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId} = httpRequest.body
        const {id} = httpRequest.params

        const playlist = await this.getPlaylistByIdService.get(id, userId)
        return ok(playlist)
    }
    
}