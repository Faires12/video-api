import { CreateComment } from "../../../domain/usecases/comment/create_comment";
import { forbidden, ok } from "../../helpers/http";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../validations";

export class CreateVideoCommentController extends Controller {
  constructor(
    validation: Validation,
    private readonly CreateCommentService: CreateComment
  ) {
    super(validation);
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { userId, videoId, content } = httpRequest.body;
    const comment = await this.CreateCommentService.create({
      userId,
      referenceId: videoId,
      content,
      isVideo: true,
    });
    if (comment === null) return forbidden(new Error("Video not found"));

    return ok(comment);
  }
}
