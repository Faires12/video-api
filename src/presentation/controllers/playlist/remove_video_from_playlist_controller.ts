import { ManageVideosInPlaylist } from "../../../domain/usecases";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class RemoveVideoFromPlaylistController extends Controller{
    constructor(validation : Validation, private readonly manageVideosInPlaylist: ManageVideosInPlaylist) {super(validation)}
    
    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, videoId, playlistId} = httpRequest.body
        const playlist = await this.manageVideosInPlaylist.manage({userId, videoId, playlistId, addVideo: false})
        return ok(playlist)
    }
}