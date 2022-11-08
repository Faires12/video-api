import { ManageVideosInPlaylist } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class AddVideoToPlaylistController extends Controller{
    constructor(validation : Validation, private readonly manageVideosInPlaylist: ManageVideosInPlaylist) {super(validation)}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, videoId, playlistId} = httpRequest.body
        await this.manageVideosInPlaylist.manage({userId, videoId, playlistId, addVideo: true})
        return ok("Video added to playlist")
    }
}