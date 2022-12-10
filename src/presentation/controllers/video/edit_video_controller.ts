import { EditVideo } from "../../../domain/usecases";
import { FileInterface } from "../../../utils/file_interface";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class EditVideoController extends Controller{
    constructor(validation: Validation, private readonly editVideoService: EditVideo) {super(validation)}

    async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
        const {userId, id, title, description} = httpRequest.body

        let thumbnail;
        if (httpRequest.files && httpRequest.files.thumbnail) {
            thumbnail = httpRequest.files.thumbnail as FileInterface;
        }

        const video = await this.editVideoService.edit({id, userId, title, description, thumbnail})
        return ok(video) 
    }
    
}