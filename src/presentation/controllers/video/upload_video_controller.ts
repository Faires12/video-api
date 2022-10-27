import { FileInterface } from "../../../application/interfaces/file_interface";
import { UploadVideo } from "../../../domain/usecases/video/upload_video";
import { badRequest, ok, serverError } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class UploadVideoController implements Controller{
    constructor(private readonly validation : Validation,
        private readonly UploadVideoService: UploadVideo) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate({...httpRequest.body, ...httpRequest.files})
            if(error)
                return badRequest(error)
            const {title, userId, description} = httpRequest.body
            const video = httpRequest.files.video as FileInterface
            const thumbnail = httpRequest.files.thumbnail as FileInterface

            const newVideo = await this.UploadVideoService.upload({title, thumbnail, file: video, userId, description})

            return ok(newVideo)
        } catch (error) {
            return serverError()
        }
    }
    
}