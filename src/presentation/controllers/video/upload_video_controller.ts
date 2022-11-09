import { UploadVideo } from "../../../domain/usecases";
import { FileInterface } from "../../../utils/file_interface";
import { ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http"
import { Validation } from "../../validations";

export class UploadVideoController extends Controller {
  constructor(
    validation: Validation,
    private readonly UploadVideoService: UploadVideo
  ) {
    super(validation);
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { title, userId, description } = httpRequest.body;
    const video = httpRequest.files.video as FileInterface;
    const thumbnail = httpRequest.files.thumbnail as FileInterface;

    const newVideo = await this.UploadVideoService.upload({
      title,
      thumbnail,
      file: video,
      userId,
      description,
    });

    return ok(newVideo.id);
  }
}
