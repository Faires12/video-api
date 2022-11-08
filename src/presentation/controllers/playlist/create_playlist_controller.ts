import { CreatePlaylist } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class CreatePlaylistController extends Controller{
    constructor(validation: Validation, private readonly createPlaylistService: CreatePlaylist){super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {title, userId, description, videoId} = httpRequest.body
        const playlist = await this.createPlaylistService.create({title, userId, description, videoId})
        return ok(playlist)
    }
    
}